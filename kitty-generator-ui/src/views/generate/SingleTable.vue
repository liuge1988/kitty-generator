<template>
  <div class="page-container">
    <div class="left-container">
      <div class="toolbar"> 
        <!-- <el-input placeholder="关键字过滤" v-model="filterText" size="medium">
          <el-button slot="append">选择表</el-button>
        </el-input> -->
        <el-button size="medium"  style="width:99%;" >选择要生成的表</el-button>
      </div>
      <div class="left-tree">
        <el-tree class="tree" :data="treeData"
          :props="defaultProps" default-expand-all :filter-node-method="filterNode"
          ref="tree" size="medium">
        </el-tree>
      </div>   
    </div>
    
    <div class="right-container">
      <div class="base-info">
          <el-input placeholder="关键字过滤" v-model="filterText" size="medium">
          <el-button slot="append">选择表</el-button>
        </el-input>
      </div>
      <div class="column-info">
        <el-table :data="tableData" class="right-table" size="small">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
      </div>
      <div class="option-info">
          <el-button size="medium"  style="width:99%;" >选择要生成的表</el-button>
      </div>
    </div>
  </div>
</template>

<style>
.page-container {
  position: absolute;
  top: 38px;
  bottom: 0px;
  width: 99%;
  padding: 5px;
  /* background-color: rgb(21, 41, 97); */
}
.left-container {
  float: left;
  width: 20%;
  height: 100%;
  border-color: rgba(173, 180, 180, 0.5);
  border-width: 1px;
  border-style: solid;
  /* background-color: rgb(124, 11, 109); */
}
.right-container {
  left: 200px;
  float: right;
  width: 78%;
  height: 100%;
  border-color: rgba(173, 180, 180, 0.5);
  border-width: 1px;
  border-style: solid;
  padding: 5px;
  /* background-color: rgb(124, 11, 109); */
}
.toolbar {
  padding: 5px;
}
.left-tree {
  margin: 5px;
}
.base-info {
  padding: 5px;
  border-color: rgba(173, 180, 180, 0.5);
  border-width: 1px;
  border-style: solid;
}
.column-info {
  padding: 5px;
  border-color: rgba(173, 180, 180, 0.5);
  border-width: 1px;
  border-style: solid;
}
.option-info {
  padding: 5px;
  border-color: rgba(173, 180, 180, 0.5);
  border-width: 1px;
  border-style: solid;
}
.right-table {
  height: 100%;
}
</style>

<script>
  export default {
    data() {
      return {
        filterText: '',
        treeData: [{
          id: 1,
          label: '一级 1'
          },{
          id: 1,
          label: '一级 1'
          },{
          id: 1,
          label: '一级 1'
          }
        ],
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }, 
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
  }
</script>