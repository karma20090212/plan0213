<template>
  <div class="container">
    <header>
      <h1>資産管理システム <span class="user-name">plan0213 様</span></h1>
    </header>

    <main>
      <section class="dashboard">
        <div class="section-header">
          <h2>保有資産一覧</h2>
          <button @click="fetchAllData" :disabled="loading" class="refresh-btn">
            {{ loading ? '更新中...' : 'データを更新' }}
          </button>
        </div>

        <div v-if="loading" class="status-msg">
          データを読み込んでいます...
        </div>

        <template v-else>
          <table class="asset-table">
            <thead>
              <tr>
                <th>資産名</th>
                <th>カテゴリー</th>
                <th>残高</th>
                <th>通貨</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asset in assets" :key="asset.id">
                <td class="font-bold">{{ asset.name }}</td>
                <td>
                  <span :class="['badge', asset.type.toLowerCase()]">
                    {{ translateType(asset.type) }}
                  </span>
                </td>
                <td class="amount">{{ formatNumber(asset.balance) }}</td>
                <td>{{ asset.currency }}</td>
              </tr>
            </tbody>
          </table>

          <section class="transactions-section" style="margin-top: 40px;">
            <h2>最近の取引履歴</h2>
            <table class="transaction-table">
              <thead>
                <tr>
                  <th>日付</th>
                  <th>カテゴリー</th>
                  <th>備考</th>
                  <th class="text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tx in transactions" :key="tx.id">
                  <td>{{ formatDate(tx.transaction_date) }}</td>
                  <td><span class="category-tag">{{ tx.category }}</span></td>
                  <td class="note-cell">{{ tx.note }}</td>
                  <td :class="['amount', tx.amount >= 0 ? 'income' : 'expense']">
                    {{ tx.amount >= 0 ? '+' : '' }}{{ formatNumber(tx.amount) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </template>

        <div v-if="!loading && assets.length === 0" class="status-msg">
          表示できる資産データがありません。
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const assets = ref([]);
const transactions = ref([]);
const loading = ref(true);

const translateType = (type) => {
  const types = {
    'Cash': '現金',
    'Bank': '銀行預金',
    'Stock': '株式',
    'Crypto': '暗号資産',
    'Other': 'その他'
  };
  return types[type] || type;
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('ja-JP').format(num);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('ja-JP');
};

const fetchAllData = async () => {
  loading.value = true;
  try {
    
    const [assetRes, transRes] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/assets`),
      fetch(`${import.meta.env.VITE_API_URL}/api/assets/transactions`)
    ]);

    const assetResult = await assetRes.json();
    const transResult = await transRes.json();

    if (assetResult.success) {
      assets.value = assetResult.data;
    }
    if (transResult.success) {
      transactions.value = transResult.data;
    }
    
    console.log('✅ Data loaded successfully.');
  } catch (error) {
    console.error('❌ Failed to retrieve data:', error);
    alert('サーバーに接続できませんでした。');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAllData();
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: sans-serif;
  color: #2c3e50;
}

header {
  border-bottom: 2px solid #42b883;
  margin-bottom: 30px;
}

h1 {
  color: #42b883;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.refresh-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.asset-table, .transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.asset-table th, .transaction-table th {
  background: #f8f9fa;
  padding: 12px;
  text-align: left;
}

.asset-table td, .transaction-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.amount {
  text-align: right;
  font-family: monospace;
}

.income { color: #2ecc71; }
.expense { color: #e74c3c; }

.category-tag {
  background: #eee;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}
</style>