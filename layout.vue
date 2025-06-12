<!-- @文件    src/layouts/Layout.vue -->
<!-- @模块    主布局组件 -->
<!-- @描述    渲染侧边栏、顶部栏、内容区（router-view）与底部 -->
<template>
  <div class="layout" :class="isDark ? 'theme-dark' : 'theme-light'">
    <!-- ═ SideBar ═ -->
    <aside class="sidebar" :class="{ collapsed, open: mobileOpen }">
      <div class="logo">
        <svg width="28" height="28" viewBox="0 0 24 24">
          <linearGradient id="logo-gradient-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--primary-light)" />
            <stop offset="100%" stop-color="var(--primary)" />
          </linearGradient>
          <linearGradient id="logo-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--primary-light)" />
            <stop offset="100%" stop-color="var(--primary)" />
          </linearGradient>
          <circle cx="12" cy="12" r="10" :fill="isDark ? 'url(#logo-gradient-dark)' : 'url(#logo-gradient-light)'" />
        </svg>
        <span v-if="!collapsed">ACME Admin</span>
      </div>
      
      <div class="user-info" v-if="!collapsed">
        <div class="avatar">{{ userInitial }}</div>
        <div class="user-details">
          <div class="username">{{ username }}</div>
          <div class="user-date">{{ currentDate }}</div>
        </div>
      </div>
      <div class="user-info collapsed-user" v-else>
        <div class="avatar">{{ userInitial }}</div>
      </div>

      <nav class="nav">
        <div v-for="item in menu" :key="item.key" class="nav-group">
          <button :class="['nav-item', { active: active === item.key || isParentActive(item) }]" @click="item.children ? toggleSubmenu(item.key) : navigate(item)">
            <span class="icon" v-html="item.icon"></span>
            <span class="label" v-if="!collapsed">{{ item.label }}</span>
            <span v-if="!collapsed && item.children" class="arrow" :class="{ open: openSubmenus.includes(item.key) }">
              <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </span>
          </button>
          <div v-if="item.children && !collapsed" class="submenu" :class="{ open: openSubmenus.includes(item.key) }" :style="{ maxHeight: openSubmenus.includes(item.key) ? `${item.children.length * 42}px` : '0' }">
            <button v-for="child in item.children" :key="child.key" :class="['submenu-item', { active: active === child.key }]" @click="navigate(child)">
              <span class="icon small" v-html="child.icon"></span>
              <span class="label">{{ child.label }}</span>
            </button>
          </div>
        </div>
      </nav>

      <button class="collapse" @click="toggleCollapsed">
        <svg :class="{ rot: collapsed }" width="14" height="14" viewBox="0 0 16 16"><path d="M6 3l4 5-4 5" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      </button>
    </aside>

    <!-- ═ Main ═ -->
    <section class="main">
      <header class="topbar">
        <button class="hamburger" @click="mobileOpen = true">
          <svg width="18" height="18" viewBox="0 0 20 20"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2"/></svg>
        </button>
        
        <div class="breadcrumb">
          <h2>{{ currentTitle }}</h2>
          <div class="breadcrumb-path" v-if="currentParent">{{ currentParent }} / {{ currentTitle }}</div>
        </div>
        
        <div class="topbar-actions">
          <button class="action-button notification-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span class="notification-indicator"></span>
          </button>
          <button class="theme-toggle" @click="toggleTheme">
            <div class="theme-icon">
              <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            </div>
          </button>
        </div>
      </header>

      <main class="content">
        <!-- 路由出口 -->
        <router-view />
      </main>

      <footer class="footer">
        <div class="footer-content">ACME © 2025</div>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
// @说明    Vue Composition API 与 Router 引入
import { ref, computed, onMounted } from 'vue'
import { useRouter }                from 'vue-router'

// @数据    菜单定义（横向写法）
const menu = [
  { key:'dashboard',label:'仪表盘',icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></svg>'},
  { key:'projects',label:'项目管理',icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',children:[
      { key:'project-list',label:'项目列表',icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>'},
      { key:'project-create',label:'创建项目',icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'},
      { key:'project-analysis',label:'项目分析',icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>'}
    ]
  },
  { key:'users',label:'用户管理',icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',children:[
      { key:'user-list',label:'用户列表',icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'},
      { key:'user-roles',label:'角色权限',icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'}
    ]
  },
  { key:'settings',label:'系统设置',icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'}
]

// @状态    侧边栏、主题、激活项等
const collapsed    = ref(false)
const mobileOpen   = ref(false)
const isDark       = ref(true)
const active       = ref('dashboard')
const openSubmenus = ref<string[]>([])

// @用户信息
const username    = ref('mysoulav')
const currentDate = ref(new Date().toLocaleDateString())
const userInitial = computed(()=>username.value.charAt(0).toUpperCase())

// @面包屑计算
const currentTitle  = computed(()=>{
  const top=menu.find(m=>m.key===active.value); if(top) return top.label
  for(const m of menu) if(m.children){ const c=m.children.find(c=>c.key===active.value); if(c) return c.label }
  return ''
})
const currentParent = computed(()=>{
  for(const m of menu) if(m.children&&m.children.find(c=>c.key===active.value)) return m.label
  return ''
})

// @初始化：加载本地存储
onMounted(()=>{
  const t=localStorage.getItem('theme'); if(t) isDark.value=t==='dark'; else localStorage.setItem('theme','dark')
  const sb=localStorage.getItem('sidebar-collapsed'); if(sb) collapsed.value=sb==='true'
  const os=localStorage.getItem('open-submenus'); if(os) openSubmenus.value=JSON.parse(os)
  const ac=localStorage.getItem('active-menu'); if(ac) active.value=ac
})

// @方法    路由跳转、子菜单切换等
const router = useRouter()
function navigate(item:any){ active.value=item.key; mobileOpen.value=false; localStorage.setItem('active-menu',item.key); router.push({ name:item.key==='dashboard'?'Home':item.key }) }
function toggleSubmenu(key:string){ openSubmenus.value.includes(key)?openSubmenus.value=openSubmenus.value.filter(x=>x!==key):openSubmenus.value.push(key); localStorage.setItem('open-submenus',JSON.stringify(openSubmenus.value)) }
function toggleCollapsed(){ collapsed.value=!collapsed.value; localStorage.setItem('sidebar-collapsed',collapsed.value.toString()) }
function toggleTheme(){ isDark.value=!isDark.value; localStorage.setItem('theme',isDark.value?'dark':'light') }
function isParentActive(item:any){ return item.children?item.children.some((c:any)=>c.key===active.value):false }
</script>
<style scoped lang="scss">
/* ========== 主题变量 ========== */    
/* ========== 基本布局：撑满屏幕 & 分区 ========== */
.layout { display: flex; height: 100vh; overflow: hidden; background: var(--bg); color: var(--text) }
.main { flex: 1; display: flex; flex-direction: column; overflow: hidden; position: relative }
.content { flex: 1; overflow-y: auto; padding: 24px; background-image: radial-gradient(circle at 10% 25%, rgba(41,98,255,0.05) 0%, transparent 50%), radial-gradient(circle at 85% 65%, rgba(13,71,161,0.04) 0%, transparent 55%) }
.theme-dark .content { background-image: radial-gradient(circle at 10% 25%, rgba(77,125,249,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 65%, rgba(77,125,249,0.05) 0%, transparent 55%) }

/* ========== SideBar ========== */
.sidebar { width:260px; background:var(--side); border-right:1px solid var(--border); display:flex; flex-direction:column; transition:width .3s; position:relative; box-shadow:var(--sidebar-shadow); backdrop-filter:blur(20px) }
.sidebar.collapsed { width:80px }
@media(max-width:768px){ .sidebar{ position:fixed; left:0; top:0; bottom:0; transform:translateX(-100%)} .sidebar.open{ transform:translateX(0); box-shadow:var(--shadow)} }
.logo{ height:70px; display:flex; align-items:center; gap:12px; padding-left:24px; font-weight:600; font-size:18px; color:var(--primary); border-bottom:1px solid var(--border); position:relative }
.logo::after{ content:''; position:absolute; left:0; right:0; bottom:-1px; height:1px; background:var(--border); box-shadow:0 1px 3px rgba(9,30,66,0.08) }

/* ========== 用户信息 ========== */
.user-info{ display:flex; align-items:center; padding:16px 24px; border-bottom:1px solid var(--divider); margin-bottom:12px }
.collapsed-user{ padding:16px 0; justify-content:center }
.avatar{ width:38px; height:38px; border-radius:10px; background:var(--avatar-bg); color:var(--avatar-text); display:flex; align-items:center; justify-content:center; font-weight:600; font-size:16px; box-shadow:0 4px 8px rgba(9,30,66,0.15); position:relative; overflow:hidden }
.avatar::before{ content:''; position:absolute; top:0; left:0; right:0; height:30%; background:linear-gradient(to bottom, rgba(255,255,255,0.2), transparent) }
.user-details{ margin-left:12px }
.username{ font-weight:600; font-size:14px }
.user-date{ font-size:12px; color:var(--text-sec); margin-top:2px }

/* ========== 导航 ========== */
.nav{ flex:1; overflow:auto; padding:8px 0 }
.nav-group{ margin-bottom:4px }
.nav-item{ width:calc(100% - 24px); margin:4px 12px; border:none; background:none; height:46px; border-radius:10px; display:flex; align-items:center; color:var(--text-sec); cursor:pointer; font-weight:500; letter-spacing:-0.2px; transition:all .2s; border:1px solid transparent }
.sidebar:not(.collapsed) .nav-item{ justify-content:flex-start; padding-left:18px }
.nav-item .icon{ flex-shrink:0; width:38px; height:20px; display:flex; align-items:center; justify-content:center }
.nav-item .label{ flex:1; text-align:left; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }
.nav-item:hover{ background:var(--hover-bg); color:var(--text); transform:translateY(-1px); box-shadow:0 4px 8px rgba(9,30,66,0.1); border-color:var(--border) }
.nav-item.active{ background:var(--sidebar-active); color:var(--active-text); box-shadow:0 6px 14px rgba(30,77,183,0.35) }
.arrow{ width:24px; display:flex; align-items:center; justify-content:center; transition:transform .3s }
.arrow.open{ transform:rotate(180deg) }

/* ========== 子菜单 ========== */
.submenu{ max-height:0; overflow:hidden; transition:max-height .3s }
.submenu-item{ width:calc(100% - 34px); margin:4px 17px; background:var(--submenu-bg); height:38px; border-radius:8px; display:flex; align-items:center; padding-left:32px; color:var(--text-sec); cursor:pointer; font-weight:500; font-size:13px; position:relative; transition:all .2s; border-left:2px solid var(--border) }
.submenu-item .icon{ width:28px; height:18px; display:flex; align-items:center; justify-content:center }
.submenu-item:hover{ background:var(--hover-bg); color:var(--text); transform:translateX(2px); box-shadow:0 2px 6px rgba(9,30,66,0.08) }
.submenu-item.active{ background:var(--hover-bg); color:var(--primary); border-left:2px solid var(--primary); box-shadow:0 2px 6px rgba(9,30,66,0.08) }

/* ========== 折叠按钮 ========== */
.collapse{ height:54px; border:none; background:none; cursor:pointer; color:var(--text-sec); display:flex; align-items:center; justify-content:center; margin-bottom:16px }
.collapse svg{ transition:transform .3s }
.collapse svg.rot{ transform:rotate(180deg) }

/* ========== Topbar ========== */
.topbar{ height:70px; background:var(--surface); border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; padding:0 28px; box-shadow:var(--topbar-shadow); position:relative; z-index:10 }
.breadcrumb h2{ margin:0; font-weight:600; font-size:18px }
.breadcrumb-path{ font-size:12px; color:var(--text-sec) }
.topbar-actions{ display:flex; align-items:center; gap:12px }
.action-button{ border:none; background:var(--hover-bg); width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; border:1px solid var(--border); box-shadow:0 2px 4px rgba(9,30,66,0.06) }
.action-button:hover{ transform:translateY(-2px); box-shadow:0 4px 8px rgba(9,30,66,0.1); border-color:var(--primary) }

/* ========== 报警与主题切换 ========== */
.notification-indicator{ position:absolute; top:10px; right:10px; width:8px; height:8px; border-radius:50%; background:var(--notification-dot); box-shadow:0 0 0 2px var(--surface) }
.theme-toggle{ border:none; background:var(--hover-bg); width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .2s; border:1px solid var(--border); box-shadow:0 2px 4px rgba(9,30,66,0.06) }
.theme-toggle:hover{ transform:translateY(-2px); box-shadow:0 4px 8px rgba(9,30,66,0.1); border-color:var(--primary) }

/* ========== Footer ========== */
.footer{ border-top:1px solid var(--border); background:var(--footer-bg); box-shadow:0 -2px 10px rgba(9,30,66,0.05); z-index:5 }
.footer-content{ height:50px; display:flex; align-items:center; justify-content:center; font-size:14px; color:var(--text-sec) }
</style>
