<template>
  <div id="app" class="mt-10">
    <div class="flex justify-center">
      <h1 class="text-yellow-500 text-4xl">{{ title }}</h1>
    </div>
    <div class="flex justify-center items-center">
      <table
        class="
          mt-10
          border-separate border-4 border-yellow-400
          overflow-hidden
          rounded-lg
          w-6/12
          text-xl text-center
          align-middle
        "
        v-if="salesByProduct"
      >
        <thead class="bg-yellow-800 text-yellow-400">
          <tr>
            <th class="p-2">ID</th>
            <th class="p-2">Nome</th>
            <th class="p-2">Total</th>
          </tr>
        </thead>
        <tbody class="text-center text-yellow-900">
          <tr
            class="bg-yellow-400 h-14"
            v-for="(sale, index) in salesByProduct"
            :key="index"
          >
            <td>#{{ index + 1 }}</td>
            <td>{{ sale.name }}</td>
            <td v-money="'R$'">{{ sale.value }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="bg-yellow-800 text-yellow-400">
            <td class="p-2">+</td>
            <td class="p-2">Total</td>
            <td class="p-2" v-money="'R$'">
              {{ calculateTotal(salesByProduct) }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductInterface from "./interfaces/ProductInterface";
import SalesInterface from "./interfaces/SalesInterface";
import GroupedInterface from "./interfaces/GroupedInterface";
import salesMock from "./mocks/SalesMock";

@Component
export default class App extends Vue {
  title = "Relatório de Vendas";
  sales: ProductInterface[] = salesMock;

  calculateTotal(sales: SalesInterface[]) {
    if (!sales) return 0;
    return sales.reduce(
      (total: number, sale: SalesInterface) => total + sale.value,
      0
    );
  }

  get salesByProduct() {
    if (!this.sales) return null;
    const salesByProduct = this.sales.reduce(
      (grouped: GroupedInterface, sale: ProductInterface) => {
        if (!grouped.hasOwnProperty(sale.name)) {
          grouped[sale.name] = {
            name: sale.name,
            value: sale.price * sale.qtde,
          };
          return grouped;
        }
        grouped[sale.name].value += sale.price * sale.qtde;
        return grouped;
      },
      {}
    );
    return Object.values(salesByProduct);
  }
}
</script>
