<template>
  <div>
    <el-form ref="ref_form_" :model="formParams" label-width="150px">
      <div class="flex_container">
        <div>
          <el-form-item label="电影名称" prop="name">
            <el-input
              class="input_width"
              size="mini"
              clearable
              v-model="formParams.name"
              placeholder="模糊搜索"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="类型" prop="type">
            <el-select
              class="input_width"
              size="mini"
              clearable
              v-model="formParams.type"
              placeholder="模糊搜索"
            >
              <el-option label="电视剧" value="电视剧"></el-option>
              <el-option label="电影" value="电影"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="电影类型" prop="movie_type">
            <el-select
              class="input_width"
              size="mini"
              clearable
              v-model="formParams.type"
              placeholder="模糊搜索"
            >
              <el-option label="科幻" value="科幻"></el-option>
              <el-option label="动作" value="动作"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-show="!isCollapse">
          <el-form-item label="收藏情况" prop="collection">
            <el-select
              size="mini"
              class="input_width"
              clearable
              v-model="formParams.y"
              placeholder="模糊搜索"
            >
              <el-option label="本地" value="本地"></el-option>
              <el-option label="云盘" value="云盘"></el-option>
              <el-option label="未收藏" value="未收藏"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-show="!isCollapse">
          <el-form-item label="排序方式" prop="sort">
            <el-select
              class="input_width"
              size="mini"
              clearable
              v-model="formParams.sort"
              placeholder="请选择"
            >
              <el-option label="观看次数" value="1"></el-option>
              <el-option label="距离上次观看" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-show="!isCollapse">
          <el-form-item label="清晰度" prop="quality">
            <el-select
              class="input_width"
              size="mini"
              clearable
              v-model="formParams.quality"
              placeholder="请选择"
            >
              <el-option label="4K" value="1"></el-option>
              <el-option label="1080P" value="2"></el-option>
              <el-option label="HDR" value="3"></el-option>
              <el-option label="杜比" value="4"></el-option>
              <el-option label="IMAX" value="5"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-show="!isCollapse">
          <el-form-item label="观看时间" prop="watched_time">
            <el-date-picker
              class="input_width"
              size="mini"
              v-model="formParams.watched_time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div v-show="!isCollapse">
          <el-form-item label="观影次数" prop="frequency">
            <el-input
              size="mini"
              class="input_width"
              type="number"
              clearable
              v-model="formParams.frequency"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div v-show="!isCollapse">
          <el-form-item label="陪同观看人" prop="company">
            <el-input
              class="input_width"
              size="mini"
              type="number"
              clearable
              v-model="formParams.company"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div v-show="!isCollapse">
          <el-form-item label="观影地址" prop="address">
            <el-input
              size="mini"
              class="input_width"
              type="number"
              clearable
              v-model="formParams.address"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div
          v-show="!isCollapse"
          style="position: absolute; bottom: 0px; right: 10px"
        >
          <el-form-item style="float: right">
            <el-button
              size="mini"
              style="background-color: #0052d9; color: white"
              @click.stop="submit()"
              icon="el-icon-search"
              :loading="loading_select"
            >
              查询
            </el-button>
            <el-button
              size="mini"
              @click.stop="resetForm()"
              icon="el-icon-refresh-right"
            >
              重置
            </el-button>
            <el-button size="mini" type="text" @click.stop="isCollapse = true">
              收起 <i class="el-icon-arrow-up"></i>
            </el-button>
          </el-form-item>
        </div>
        <div style="height: 38px"></div>
        <div
          v-show="isCollapse"
          style="position: absolute; bottom: 0px; right: 10px"
        >
          <el-form-item style="float: right">
            <el-button
              size="mini"
              style="background-color: #0052d9; color: white"
              @click.stop="submit()"
              icon="el-icon-search"
              :loading="loading_select"
            >
              查询
            </el-button>
            <el-button
              size="mini"
              @click.stop="resetForm()"
              icon="el-icon-refresh-right"
            >
              重置
            </el-button>
            <el-button size="mini" type="text" @click.stop="isCollapse = false">
              展开 <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-form-item>
        </div>
        <div class="empty_card"></div>
        <div class="empty_card"></div>
        <div class="empty_card"></div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  created() {},
  data() {
    return {
      isCollapse: false,
      loading_select: false,
      formParams: {
        name: "",
        type: "",
        movie_type: "",
        collection: "",
        sort: "",
        quality: "",
        watched_time: "",
        frequency: "",
        company: "",
        address: "",
        size: 50,
        current: 1,
      },
    };
  },
  methods: {
    resetForm() {
      this.formParams = {
        name: "",
        type: "",
        movie_type: "",
        collection: "",
        sort: "",
        quality: "",
        watched_time: "",
        frequency: "",
        company: "",
        address: "",
        size: 50,
        current: 1,
      };
      this.getTableData();
    },
    getTableData() {},
    submit() {
      this.getTableData();
    },
  },
};
</script>

<style scoped>
.flex_container {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding-right: 20px; */
  /* padding-left: 20px; */
  position: relative;
}

.flex_container > div {
  flex: 1;
  min-width: 380px;
}

.empty_card {
  height: 0;
  margin-top: 0;
}
.input_width {
  width: 220px;
}
</style>