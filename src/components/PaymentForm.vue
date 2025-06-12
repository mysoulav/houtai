<template>
  <div class="payment-card">
    <h2>Payment</h2>
    <form @submit.prevent="submit">
      <div class="form-row">
        <label>Card Number</label>
        <input v-model="card" type="text" placeholder="xxxx xxxx xxxx xxxx" />
      </div>
      <div class="form-row double">
        <div>
          <label>Expiry</label>
          <input v-model="expiry" type="text" placeholder="MM/YY" />
        </div>
        <div>
          <label>CVV</label>
          <input v-model="cvv" type="text" placeholder="123" />
        </div>
      </div>
      <div class="form-row">
        <label>Amount</label>
        <input v-model="amount" type="number" placeholder="0.00" />
      </div>
      <button type="submit" class="pay-btn">Pay</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const card = ref('')
const expiry = ref('')
const cvv = ref('')
const amount = ref('')

function submit() {
  alert('Payment submitted')
}
</script>

<style scoped>
.payment-card {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  border-radius: 12px;
}
.payment-card h2 {
  margin: 0 0 20px;
  text-align: center;
}
.form-row {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}
.form-row.double {
  flex-direction: row;
  gap: 12px;
}
.form-row label {
  font-size: 14px;
  color: var(--text-sec);
  margin-bottom: 4px;
}
.form-row input {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text);
}
.pay-btn {
  width: 100%;
  padding: 10px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: var(--btn-shadow);
  cursor: pointer;
  font-weight: 600;
}
.pay-btn:hover {
  background: var(--primary-hover);
}
</style>
