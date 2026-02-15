<template>
  <div class="container">
    <header>
      <h1>資産管理システム <span class="user-name">plan0213 様</span></h1>
    </header>
    
    <main>
      <section class="dashboard">
        <div class="section-header">
          <h2>保有資産一覧</h2>
          <button @click="fetchAssets" :disabled="loading" class="refresh-btn">
            {{ loading ? '更新中...' : 'データを更新' }}
          </button>
        </div>

        <div v-if="loading" class="status-msg">
          データを読み込んでいます...
        </div>
        
        <table v-else class="asset-table">
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

const fetchAssets = async () => {
  loading.value = true;
  try {
    const response = await fetch('http://localhost:3000/api/assets');
    const result = await response.json();
    assets.value = result.data;
  } catch (error) {
    console.error('データ取得失敗:', error);
    alert('サーバーに接続できませんでした。');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAssets();
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
  color: #2c3e50;
}

header {
  border-bottom: 2px solid #42b883;
  margin-bottom: 30px;
  padding-bottom: 10px;
}

h1 {
  color: #42b883;
  font-size: 1.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-name {
  font-size: 1rem;
  color: #666;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.refresh-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.refresh-btn:hover {
  opacity: 0.8;
}

.asset-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.asset-table th {
  background-color: #f8f9fa;
  padding: 15px;
  text-align: left;
  border-bottom: 2px solid #eee;
}

.asset-table td {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.font-bold {
  font-weight: bold;
}

.amount {
  font-family: 'Courier New', Courier, monospace;
  text-align: right;
  font-weight: bold;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  background: #eee;
}

.badge.bank { background: #e3f2fd; color: #1976d2; }
.badge.cash { background: #e8f5e9; color: #388e3c; }

.status-msg {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>