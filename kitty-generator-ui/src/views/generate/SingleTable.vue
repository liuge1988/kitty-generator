<template>
  <div class="page-container">
    <div class="left-container">
      <div class="toolbar"> 
        <!-- <el-input placeholder="关键字过滤" v-model="filterText" size="medium">
          <el-button slot="append">选择表</el-button>
        </el-input> -->
        <el-button size="medium"  style="width:99%;" @click="getTables" :loading="tableLoading">选择要生成的表</el-button>
      </div>
      <div class="left-tree">
        <el-tree class="tree" :loading="tableLoading" :data="treeData" :filter-node-method="filterNode" 
          @node-click="selectTableChange" ref="tree" size="medium">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.name }} </span>
          </span>
        </el-tree>
      </div>   
    </div>
    
    <div class="right-container">
      <div class="base-info">
        <el-form ref="tableForm" class="tableForm" :model="tableModel" :inline="true" label-width="80px"
          size="small">
          <el-form-item label="表名">
            <el-input v-model="tableModel.name" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="类名">
            <el-input v-model="tableModel.className"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="tableModel.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="column-info">
        <el-table :data="tableModel.columns" class="right-table" size="small" height="370" max-height="380">
          <el-table-column v-for="column in filedTableColumn"  :key="column.id"
            :prop="column.prop" :label="column.label" :width="column.width">
          </el-table-column>
        </el-table>
      </div>
      <div class="option-info">
        <el-form ref="optionForm" class="optionForm" :inline="true" label-width="80px"
          size="small">
          <span>
            <el-form-item label="基础包名">
              <el-input v-model="generateModel.basePackage" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="生成目录">
              <el-input v-model="generateModel.outPutFolderPath">
                <el-button type="file" slot="append" icon="fa fa-folder fa-lg" @click="chooseOutputFolder"></el-button>
              </el-input>
            </el-form-item>
          </span>
          <span style="float:right; padding-right:15px;">
            <el-button size="small" type="primary" :loading="generateLoading" @click="generateCode">生成代码</el-button>
          </span>
        </el-form>
      </div>
    </div>
    <!--数据源配置界面-->
    <datasource-dialog ref="datasourceDialog" v-if="datasourceVisible"></datasource-dialog>
    <!--表格数据选择界面-->
    <select-table-dialog title="选择要生成的表" ref="selectTableDialog" v-if="selectTableDialogVisible"
      :data="selectTableData" :columns="selectTableColumns" @selectionChange="tableSelectionChange"
      :showHeader="true">
    </select-table-dialog>
  </div>
</template>

<script>
import axios from "axios";
import DatasourceDialog from "@/views/Datasource/DatasourceDialog";
import SelectTableDialog from "@/components/SelectTableDiaog";
export default {
  components: {
    DatasourceDialog,
    SelectTableDialog
  },
  data() {
    return {
      treeLoading: false,
      tableLoading: false,
      generateLoading: false,
      datasourceVisible: false,
      selectTableDialogVisible: false,
      baseUrl: this.global.baseUrl,
      filterText: "",
      selectTableData: null,
      tableModel: {},
      generateModel: {
        basePackage:'',
        outPutFolderPath:'',
        connParam:null,
        tableModels:null
      },
      treeData: null,
      selectTableColumns: [
        {
          prop: "name",
          label: "名称"
        },
        {
          prop: "description",
          label: "描述"
        }
      ],
      filedTableColumn: [
        {
          prop: "name",
          label: "字段名"
        },
        {
          prop: "fieldName",
          label: "属性名"
        },
        {
          prop: "dataType",
          label: "数据类型"
        },
        {
          prop: "javaType",
          label: "Java类型"
        },
        {
          prop: "description",
          label: "描述"
        }
      ]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    // 打开数据源配置界面
    configDatasource() {
      this.datasourceVisible = true;
      this.$nextTick(() => {
        this.$refs.datasourceDialog.init();
      });
    },
    // 过滤表显示
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 获取要生成的表
    getTables() {
      this.tableLoading = true;
      let dsStr = localStorage.getItem("datasource");
      if (dsStr == null) {
        this.configDatasource();
      }
      dsStr = localStorage.getItem("datasource");
      axios.post(this.baseUrl + "/getTables", JSON.parse(dsStr)).then(res => {
        res = res.data;
        if (res.code == 200) {
          this.selectTableDialogVisible = true;
          this.selectTableData = res.data;
          this.$nextTick(() => {
            this.$refs.selectTableDialog.init();
          });
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
        this.tableLoading = false;
      })
    },
    // 选择要生成的表
    tableSelectionChange(selections) {
      this.treeLoading = true;
      this.tableLoading = true;
      let dsStr = localStorage.getItem("datasource");
      let params = {
        connParam: JSON.parse(dsStr),
        tableModels: selections
      };
      axios.post(this.baseUrl + "/getGenerateModel", params).then(res => {
        res = res.data;
        if (res.code == 200) {
          this.generateModel = res.data
          this.treeData = this.generateModel.tableModels;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
        this.treeLoading = false;
        this.tableLoading = false;
      })
    },
    // 选择查看表信息
    selectTableChange(data) {
      this.tableModel = data;
    },
    // 选择代码输出目录
    chooseOutputFolder() {

    },
    // 生成代码
    generateCode() {
      this.generateLoading = true;
      axios.post(this.baseUrl + "/generateModels", this.generateModel).then(res => {
        res = res.data;
        if (res.code == 200) {
          this.$message({ message: '代码生成完成', type: 'success' })
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
        this.generateLoading = false;
      })
    }
  }
}
</script>

<style>
.page-container {
  position: absolute;
  top: 35px;
  bottom: 5px;
  width: 99%;
  padding: 4px;
  /* background-color: rgb(21, 41, 97); */
}
.left-container {
  float: left;
  width: 20%;
  height: 100%;
}
.right-container {
  left: 200px;
  float: right;
  width: 78%;
  height: 100%;
}
.page-container > div {
  padding: 3px;
  border-color: rgba(173, 180, 180, 0.5);
  border-width: 1px;
  border-style: solid;
}
.base-info,
.column-info,
.option-info {
  padding-top: 15px;
  border-color: rgba(173, 180, 180, 0.2);
  border-width: 1px;
  border-style: solid;
}
.base-info,
.column-info,
.option-info {
  margin: 5px;
}
.tableForm {
  text-align: left;
}
.tree {
  padding-top: 10px;
}
</style>