<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>Sidebar</h2>
    </aside>
    <main class="main">
      <header class="topbar">
        <h1>Dashboard</h1>
      </header>
      <section class="content">
        <form class="demo-form">
          <div class="form-row">
            <label for="name">Name</label>
            <input id="name" type="text" placeholder="Enter your name" />
          </div>
          <div class="form-row">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div class="form-row">
            <button type="submit">Submit</button>
          </div>
        </form>
        <table class="demo-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Alice</td>
              <td>alice@example.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Bob</td>
              <td>bob@example.com</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "Layout"
};
</script>

<style scoped>
/**** Optional scoped styles could go here ****/
</style>
