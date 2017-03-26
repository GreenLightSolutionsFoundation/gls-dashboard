<template>
<md-table-card>
  <md-toolbar class="md-transparent">




  <md-input-container>
    <h2 class="md-title" style="flex: 1">Users</h2>
    <md-button class="md-icon-button">
      <md-icon>search</md-icon>
    </md-button>
    <md-input placeholder="search" class></md-input>
  </md-input-container>
  </md-toolbar>
  <md-table md-sort="calories">
    <md-table-header>
      <md-table-row>
        <md-table-head md-sort-by="dessert">Dessert (100g serving)</md-table-head>
        <md-table-head md-sort-by="calories" md-numeric md-tooltip="The total amount of food energy and the given serving size">Calories (g)</md-table-head>
        <md-table-head md-sort-by="fat" md-numeric>Fat (g)</md-table-head>
        <md-table-head md-sort-by="carbs" md-numeric>Carbs (g)</md-table-head>
        <md-table-head md-sort-by="protein" md-numeric>Protein (g)</md-table-head>
      </md-table-row>
    </md-table-header>
    <md-table-body>
      <md-table-row v-for="(row, index) in 5" :key="index">
        <md-table-cell>Dessert Orange</md-table-cell>
        <md-table-cell v-for="(col, index) in 4" :key="index" md-numeric>10</md-table-cell>
      </md-table-row>
    </md-table-body>
  </md-table>
  <md-table-pagination md-size="5" md-total="10" md-page="1" md-label="Rows" md-separator="of" :md-page-options="[5, 10, 25, 50]" @pagination="onPagination">
  </md-table-pagination>
</md-table-card>
</template>
<script>
export default {
  name: 'user-admin',
}
</script>
