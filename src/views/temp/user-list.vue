<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb style="margin-bottom: 10px;" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="8">
          <el-input placeholder="请输入用户名" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域
          border：为表格加边框
          stripe：为表格增加隔行变色
      -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="性别" prop="sex">
          <template slot-scope="scope">
            <el-button type="primary" circle v-if="scope.row.sex=='1'">男</el-button>
            <el-button type="success" circle v-if="scope.row.sex=='0'">女</el-button>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" prop="roleName">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.roleName=='admin'">管理员</el-button>
            <el-button type="success" v-if="scope.row.roleName=='user'">普通用户</el-button>
          </template>
        </el-table-column>
        <el-table-column label="生日" prop="birthdayText"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" @click="showEditDialog(scope.row.id)" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" @click="removeUserById(scope.row.id)" icon="el-icon-delete"
                       size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <div style="width: 30%">
            <el-radio v-model="addForm.sex" label="1">男</el-radio>
            <el-radio v-model="addForm.sex" label="0">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <div style="width:40%">
            <el-date-picker
                v-model="addForm.birthday"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>

      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
        title="修改用户信息"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed">
      <el-form :model="editForm" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="email">
          <div style="width: 30%">
            <el-radio v-model="editForm.sex" label="1">男</el-radio>
            <el-radio v-model="editForm.sex" label="0">女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="生日" prop="email">
          <div style="width:40%">
            <el-date-picker
                v-model="editForm.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  getPage,
  updateStatus,
  save,
  getById,
  updateById,
  removeById
} from '@/api/user.js'

export default {
  // 当前组件的私有数据
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '', // 查询参数
        page: 1, // 当前页数
        limit: 5 // 每页显示的数据
      },
      userList: [],
      total: 0,
      // 是否显示对话框 默认为不显示
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        email: '',
        sex: '1',
        birthday: ''
      },

      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
    }
  },
  // 生命周期函数
  created() {
    // 发起数据请求
    this.getUserList()
  },
  // 事件处理函数
  methods: {
    async getUserList() {
      getPage(this.queryInfo).then(res => {
        console.log(res)
        this.userList = res.data.data.map(item => {
          item.password = ''
          if (item.birthday) {
            item.birthdayText = item.birthday.substr(0, 10)
          } else {
            item.birthdayText = "未填写"
          }
          item.status = item.status == "0" ? true : false
          return item;
        })
        this.total = res.data.total
      })
    },
    // 箭头 pagesize 改变的事件
    handleSizeChange(newSize) {
      //console.log(newSize)
      this.queryInfo.limit = newSize
      this.getUserList()
    },
    // 监听页码值，改变的事件
    handleCurrentChange(newPage) {
      //console.log(newPage)
      this.queryInfo.page = newPage
      this.getUserList()
    },
    // 监听 switch 开关状态的改变
    async userStateChanged(userinfo) {
      // console.log(userinfo)
      let data = {
        uId: userinfo.id,
        status: userinfo.status ? "1" : "0"
      }
      updateStatus(data).then(res => {
        this.$message.success('状态更新成功')
        // console.log(res)
        this.getUserList()
      })
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      // 解决时区问题
      this.addForm.birthday = new Date(this.addForm.birthday).toISOString()

      console.log(this.addForm)
      save(this.addForm).then(res => {
        // console.log(res)
        this.$message.success('添加用户成功')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 刷新用户列表
        this.getUserList()
      })
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      // console.log(id)

      getById({id}).then(res => {
        console.log(res)
        this.editDialogVisible = true
        this.$message.success('查询用户成功')
        this.editForm = res.data.data
      })
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    editUserInfo() {
      // 解决时区问题
      this.editForm.birthday = new Date(this.editForm.birthday).toISOString()
      console.log(this.editForm)
      updateById(this.editForm).then(res => {
        //console.log(res)
        this.$message.success('修改用户成功')
        // 隐藏添加用户的对话框
        this.editDialogVisible = false
        // 刷新用户列表
        this.getUserList()
      })
    },
    // 根据id删除对应的用户信息
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).catch(err => {
        return err
      })
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }

      removeById(id).then(() => {
        this.$message.success('删除用户成功')
        this.getUserList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
