<template>
  <div class="home-page" :key="componentKey">
    <!-- Header Navigation -->
    <header class="bg-white border-bottom fixed-header">
      <div class="container-fluid px-4 py-3">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <a href="#" class="navbar-brand text-orange fw-bold">{{ $t('home.brand') }}</a>
            <nav class="d-none d-md-flex ms-4">
              <router-link to="/" class="nav-link" exact active-class="active">{{ $t('nav.home') }}</router-link>
              <router-link to="/shop" class="nav-link" active-class="active">{{ $t('nav.shop') }}</router-link>
              <router-link to="/designers" class="nav-link" active-class="active">{{ $t('nav.designers') }}</router-link>
              <router-link to="/community" class="nav-link" active-class="active">{{ $t('nav.community') }}</router-link>
              <div class="dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  {{ $t('nav.about') }}
                </a>
                <div class="dropdown-menu dropdown-menu-mega p-4">
                  <div class="row">
                    <div class="col-3 border-end">
                      <div class="border mb-3" style="width: 64px; height: 48px;"></div>
                      <h6 class="fw-bold">{{ $t('about.company') }}</h6>
                      <p class="small text-muted">{{ $t('about.description') }}</p>
                    </div>
                    <div class="col-3">
                      <h6 class="fw-bold mb-3">{{ $t('about.quickLinks') }}</h6>
                      <ul class="list-unstyled small">
                        <li class="mb-2"><a href="#" class="text-decoration-none">{{ $t('about.sitemap') }}</a></li>
                        <li class="mb-2"><a href="#" class="text-decoration-none">{{ $t('about.terms') }}</a></li>
                        <li class="mb-2"><a href="#" class="text-decoration-none">{{ $t('about.privacy') }}</a></li>
                        <li class="mb-2"><a href="#" class="text-decoration-none">{{ $t('about.partners') }}</a></li>
                      </ul>
                    </div>
                    <div class="col-3">
                      <h6 class="fw-bold mb-3">{{ $t('about.support') }}</h6>
                      <ul class="list-unstyled small">
                        <li class="mb-2"><a href="#" class="text-decoration-none">{{ $t('about.help') }}</a></li>
                        <li class="mb-2"><a href="#" class="text-decoration-none">{{ $t('about.faq') }}</a></li>
                        <li class="mb-2"><a href="#" class="text-decoration-none">{{ $t('about.feedback') }}</a></li>
                      </ul>
                    </div>
                    <div class="col-3">
                      <h6 class="fw-bold mb-3">{{ $t('about.contact') }}</h6>
                      <ul class="list-unstyled small">
                        <li class="mb-2"><i class="bi bi-geo-alt me-2"></i>{{ $t('about.address') }}</li>
                        <li class="mb-2"><i class="bi bi-telephone me-2"></i>{{ $t('about.phone') }}</li>
                        <li class="mb-2"><i class="bi bi-envelope me-2"></i>{{ $t('about.email') }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div class="d-flex align-items-center gap-3">
            <!-- 语言切换器 -->
            <LanguageSwitcher />
            
            <div class="position-relative">
              <input type="text" class="form-control" :placeholder="$t('home.search')" style="width: 250px; padding-left: 35px;">
              <i class="bi bi-search position-absolute" style="left: 10px; top: 50%; transform: translateY(-50%);"></i>
            </div>
            <router-link to="/cart" class="btn btn-outline-orange btn-sm">{{ $t('nav.cart') }}</router-link>
            <router-link to="/profile/orders" class="btn btn-outline-orange btn-sm">{{ $t('nav.orders') }}</router-link>
            <router-link to="/post-demand" class="btn btn-outline-orange btn-sm">{{ $t('nav.request') }}</router-link>
            <router-link to="/login" class="btn btn-outline-orange btn-sm">{{ $t('nav.login') }}</router-link>
            <router-link to="/register" class="btn btn-orange btn-sm">{{ $t('nav.register') }}</router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container-fluid px-4 py-4 main-content-wrapper">
      <div class="row">
        <!-- Left Sidebar Filter -->
        <aside class="col-md-2 sidebar-filter">
          <!-- Style Filter -->
          <div class="mb-4">
            <h6 class="fw-medium mb-3">
              <i class="bi bi-brush me-2"></i>{{ $t('home.filter.style') }}
            </h6>
            <div class="filter-list">
              <div class="filter-item">{{ $t('home.style.modern') }}</div>
              <div class="filter-item">{{ $t('home.style.scandinavian') }}</div>
              <div class="filter-item">{{ $t('home.style.chinese') }}</div>
              <div class="filter-item">{{ $t('home.style.american') }}</div>
              <div class="filter-item">{{ $t('home.style.japanese') }}</div>
              <div class="filter-item">{{ $t('home.style.luxury') }}</div>
              <div class="filter-item">{{ $t('home.style.industrial') }}</div>
              <div class="filter-item">{{ $t('home.style.mediterranean') }}</div>
            </div>
          </div>

          <!-- Color & Tone -->
          <div class="mb-4">
            <h6 class="fw-medium mb-3">
              <i class="bi bi-palette me-2"></i>{{ $t('home.filter.color') }}
            </h6>
            <div class="color-swatches-grid">
              <!-- 基础颜色 -->
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('white') }" 
                   style="background: #ffffff;" :title="$t('color.white')" @click="toggleColor('white')"></div>
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('black') }" 
                   style="background: #000000;" :title="$t('color.black')" @click="toggleColor('black')"></div>
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('gray') }" 
                   style="background: #6b7280;" :title="$t('color.gray')" @click="toggleColor('gray')"></div>
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('beige') }" 
                   style="background: #d4c5b9;" :title="$t('color.beige')" @click="toggleColor('beige')"></div>
              
              <!-- 暖色系 -->
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('red') }" 
                   style="background: #ef4444;" :title="$t('color.red')" @click="toggleColor('red')"></div>
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('orange') }" 
                   style="background: #f97316;" :title="$t('color.orange')" @click="toggleColor('orange')"></div>
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('yellow') }" 
                   style="background: #fbbf24;" :title="$t('color.yellow')" @click="toggleColor('yellow')"></div>
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('blue') }" 
                   style="background: #3b82f6;" :title="$t('color.blue')" @click="toggleColor('blue')"></div>
              
              <!-- 紫色 -->
              <div class="color-swatch" :class="{ 'selected': selectedColors.includes('purple') }" 
                   style="background: #8b5cf6;" :title="$t('color.purple')" @click="toggleColor('purple')"></div>
              
              <!-- 自定义颜色按钮 -->
              <div class="color-swatch custom-color-btn" :title="$t('color.custom')" @click="showColorPicker = true">
                <span style="font-size: 18px; font-weight: bold;">+</span>
              </div>
            </div>
          </div>

          <!-- 自定义颜色选择器弹窗 -->
          <div v-if="showColorPicker" class="color-picker-modal" @click.self="showColorPicker = false">
            <div class="color-picker-dialog">
              <div class="color-picker-header">
                <h6 class="mb-0">{{ $t('color.picker.title') }}</h6>
                <button class="btn-close" @click="showColorPicker = false"></button>
              </div>
              
              <div class="color-picker-body">
                <!-- 简化的颜色输入 -->
                <div class="mb-3">
                  <label class="form-label">{{ $t('color.picker.selected') }}:</label>
                  <input 
                    type="color" 
                    class="form-control form-control-color" 
                    v-model="customColor.hex"
                    :title="$t('color.picker.selected')"
                  >
                </div>
                
                <!-- 当前选中颜色显示 -->
                <div class="mt-2 p-2 border rounded bg-light">
                  <div class="d-flex align-items-center gap-2">
                    <div 
                      class="color-preview" 
                      :style="{ background: customColor.hex }"
                    ></div>
                    <div class="flex-grow-1">
                      <small class="text-muted d-block" style="font-size: 0.7rem;">{{ $t('color.picker.selected') }}</small>
                      <strong style="font-size: 0.85rem;">{{ customColor.hex }}</strong>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="color-picker-footer">
                <button class="btn btn-secondary btn-sm" @click="showColorPicker = false">{{ $t('color.picker.cancel') }}</button>
                <button class="btn btn-orange btn-sm" @click="addCustomColor">{{ $t('color.picker.add') }}</button>
              </div>
            </div>
          </div>

          <!-- Material -->
          <div class="mb-4">
            <h6 class="fw-medium mb-3">
              <i class="bi bi-layers me-2"></i>{{ $t('home.filter.material') }}
            </h6>
            <div class="filter-list">
              <div class="filter-item">{{ $t('home.material.wood') }}</div>
              <div class="filter-item">{{ $t('home.material.metal') }}</div>
              <div class="filter-item">{{ $t('home.material.fabric') }}</div>
              <div class="filter-item">{{ $t('home.material.leather') }}</div>
              <div class="filter-item">{{ $t('home.material.glass') }}</div>
              <div class="filter-item">{{ $t('home.material.stone') }}</div>
            </div>
          </div>

          <!-- Tier -->
          <div class="mb-4">
            <h6 class="fw-medium mb-3">
              <i class="bi bi-layers me-2"></i>{{ $t('home.filter.tier') }}
            </h6>
            <div class="filter-list">
              <div class="filter-item">{{ $t('home.tier.basic') }}</div>
              <div class="filter-item">{{ $t('home.tier.standard') }}</div>
              <div class="filter-item">{{ $t('home.tier.premium') }}</div>
              <div class="filter-item">{{ $t('home.tier.luxury') }}</div>
            </div>
          </div>

          <!-- Featured -->
          <div class="mb-4">
            <h6 class="fw-medium mb-3">
              <i class="bi bi-star me-2"></i>{{ $t('home.filter.featured') }}
            </h6>
            <div class="filter-list">
              <div class="filter-item">{{ $t('home.featured.hot') }}</div>
              <div class="filter-item">{{ $t('home.featured.new') }}</div>
              <div class="filter-item">{{ $t('home.featured.choice') }}</div>
              <div class="filter-item">{{ $t('home.featured.rated') }}</div>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="col-md-10">
          <!-- Room Type Filter Tabs -->
          <div class="text-center mb-4">
            <div class="d-inline-flex gap-4">
              <a href="#" class="text-orange fw-medium">{{ $t('room.all') }}</a>
              <a href="#" class="text-muted">{{ $t('room.kitchen') }}</a>
              <a href="#" class="text-muted">{{ $t('room.bathroom') }}</a>
              <a href="#" class="text-muted">{{ $t('room.living') }}</a>
              <a href="#" class="text-muted">{{ $t('room.bedroom') }}</a>
              <a href="#" class="text-muted">{{ $t('room.dining') }}</a>
              <a href="#" class="text-muted">{{ $t('room.entryway') }}</a>
              <a href="#" class="text-muted">{{ $t('room.whole') }}</a>
            </div>
          </div>

          <!-- Featured Section -->
          <div class="row mb-4">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="fw-bold mb-3">{{ $t('home.cases.title') }}</h5>
                  <div class="d-flex gap-4 mb-3 small">
                    <a href="#" class="text-decoration-none"><i class="bi bi-grid me-1"></i>{{ $t('home.cases.all') }}</a>
                    <a href="#" class="text-muted text-decoration-none">{{ $t('home.cases.recommended') }}</a>
                    <a href="#" class="text-muted text-decoration-none">{{ $t('home.cases.popular') }}</a>
                    <a href="#" class="text-muted text-decoration-none">{{ $t('home.cases.bestsellers') }}</a>
                    <a href="#" class="text-muted text-decoration-none">{{ $t('home.cases.sale') }}</a>
                  </div>

                  <!-- Featured Image -->
                  <div class="position-relative featured-image-container" style="cursor: pointer;" @click="goToCaseDetail(1)">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop" 
                         alt="Featured" class="w-100 h-100 object-fit-cover rounded">
                    
                    <!-- Action Buttons - Top Right -->
                    <div class="position-absolute top-0 end-0 p-3 d-flex gap-2">
                      <button class="btn-circle-action" :title="$t('action.like')">
                        ❤️
                      </button>
                      <button class="btn-circle-action" :title="$t('action.favorite')">
                        ⭐
                      </button>
                      <button class="btn-circle-action" :title="$t('action.share')">
                        ↗️
                      </button>
                    </div>

                    <!-- Info Overlay -->
                    <div class="info-overlay">
                      <div class="d-flex justify-content-between align-items-end">
                        <div>
                          <h5 class="fw-bold mb-3 text-white">{{ $t('home.cases.modern') }}</h5>
                          <div class="d-flex gap-2 mb-2">
                            <span class="badge bg-orange">{{ $t('home.cases.style.modern') }}</span>
                            <span class="badge bg-primary">{{ $t('home.cases.area') }}</span>
                            <span class="badge bg-white text-dark">{{ $t('home.cases.type.whole') }}</span>
                          </div>
                          <p class="small text-white mb-0">{{ $t('home.cases.desc') }}</p>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                          <span class="text-white fw-bold fs-4">{{ $t('home.cases.price') }}</span>
                          <button class="btn btn-outline-light">{{ $t('home.addCart') }}</button>
                          <router-link to="/buy-now/no-payment-no-address" class="btn btn-light text-decoration-none">{{ $t('home.buyNow') }}</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Design Cards Grid -->
          <div class="row g-4 mb-4">
            <div class="col-md-6" v-for="(card, index) in designCards" :key="index">
              <div class="card h-100" style="cursor: pointer;" @click="goToCaseDetail(card.id)">
                <img :src="card.image" class="card-img-top" style="height: 200px; object-fit: cover;" :alt="card.title">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="fw-medium mb-0">{{ card.title }}</h6>
                    <span class="text-orange fw-bold">${{ card.price }}</span>
                  </div>
                  <p class="small text-muted mb-3">{{ card.description }}</p>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center gap-2">
                      <img :src="card.designer.avatar" class="rounded-circle" width="24" height="24" :alt="card.designer.name">
                      <span class="small text-muted">{{ card.designer.name }}</span>
                    </div>
                    <div class="d-flex gap-3 small text-muted">
                      <span class="stat-item" @click="toggleLike(card)" :class="{ 'active': card.isLiked }">
                        <i :class="card.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'" class="me-1"></i>{{ card.likes }}
                      </span>
                      <span class="stat-item" @click="toggleFavorite(card)" :class="{ 'active': card.isFavorited }">
                        <i :class="card.isFavorited ? 'bi bi-star-fill' : 'bi bi-star'" class="me-1"></i>{{ card.favorites }}
                      </span>
                      <span class="stat-item" @click="shareCard(card)">
                        <i class="bi bi-arrow-up-right me-1"></i>{{ card.shares }}
                      </span>
                      <span class="stat-item">
                        <i class="bi bi-eye me-1"></i>{{ card.views }}
                      </span>
                    </div>
                  </div>
                  <div class="d-flex gap-2">
                    <router-link to="/cart" class="btn btn-outline-secondary btn-sm flex-fill text-decoration-none text-center">{{ $t('home.addCart') }}</router-link>
                    <router-link to="/buy-now/no-payment-no-address" class="btn btn-orange btn-sm flex-fill text-decoration-none text-center">{{ $t('home.buyNow') }}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Promotional Event -->
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                  <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=200&h=150&fit=crop" 
                       class="w-100 rounded" alt="Event">
                </div>
                <div class="col-md-9">
                  <h5 class="text-orange fw-bold mb-2">{{ $t('home.event.title') }}</h5>
                  <p class="small text-muted mb-2">{{ $t('home.event.desc') }}</p>
                  <p class="small mb-2">
                    {{ $t('home.event.hot') }}
                  </p>
                  <p class="small mb-2">
                    <span class="text-orange">{{ $t('home.event.period') }}</span> {{ $t('home.event.periodDesc') }}
                  </p>
                  <p class="small">
                    <span class="text-orange">{{ $t('home.event.howto') }}</span> {{ $t('home.event.howtoDesc') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container-fluid px-4">
        <div class="text-center small text-muted">
          <p class="mb-0">{{ $t('common.copyright') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import type { I18nPlugin } from '@/plugins/i18n'

const router = useRouter()
const i18n = inject<I18nPlugin>('i18n')
const instance = getCurrentInstance()

// 创建响应式的语言状态
const currentLanguage = ref(i18n?.currentLocale || 'zh')

// 强制组件重新渲染的key
const componentKey = ref(0)

// 使用翻译函数 - 使其响应式
const $t = (key: string) => {
  // 访问currentLanguage.value以建立响应式依赖
  const _ = currentLanguage.value
  return i18n?.t(key) || key
}

// 监听语言变化
onMounted(() => {
  window.addEventListener('user-web-language-changed', (event: any) => {
    currentLanguage.value = event.detail.locale
    // 强制重新渲染
    componentKey.value++
    // 同时触发Vue实例的强制更新
    instance?.proxy?.$forceUpdate()
  })
})

// 颜色筛选状态
const selectedColors = ref<string[]>([])
const showColorPicker = ref(false)
const customColor = ref({ hex: '#f97316' })

// 切换颜色选择
const toggleColor = (color: string) => {
  const index = selectedColors.value.indexOf(color)
  if (index > -1) {
    selectedColors.value.splice(index, 1)
  } else {
    selectedColors.value.push(color)
  }
}

// 添加自定义颜色
const addCustomColor = () => {
  const hexColor = customColor.value.hex
  if (hexColor && !selectedColors.value.includes(hexColor)) {
    selectedColors.value.push(hexColor)
  }
  showColorPicker.value = false
}

// 颜色选择器变化事件
const handleColorChange = (color: any) => {
  customColor.value = color
}

// 跳转到案例详情页
const goToCaseDetail = (caseId: number) => {
  router.push(`/case/${caseId}`)
}

// 设计案例卡片数据 - 静态数据
const baseDesignCards = [
  {
    id: 1,
    title: 'Elegant Romantic Minimalism',
    price: 1999,
    description: 'Scandinavian modern minimalist style, pursuing clean and bright design concepts',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer1',
    likes: 128,
    favorites: 95,
    shares: 42,
    views: '1.2k'
  },
  {
    id: 2,
    title: 'Elegant · Clean Minimalism',
    price: 1800,
    description: 'Scandinavian modern minimalist style, pursuing clean and bright design concepts',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=250&fit=crop',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer2',
    likes: 98,
    favorites: 76,
    shares: 31,
    views: '856'
  },
  {
    id: 3,
    title: 'Elegant Romantic Minimalism',
    price: 1999,
    description: 'Scandinavian modern minimalist style, pursuing clean and bright design concepts',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=250&fit=crop',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer3',
    likes: 156,
    favorites: 112,
    shares: 58,
    views: '2.1k'
  },
  {
    id: 4,
    title: 'Elegant · Clean Minimalism',
    price: 1800,
    description: 'Scandinavian modern minimalist style, pursuing clean and bright design concepts',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer4',
    likes: 89,
    favorites: 64,
    shares: 28,
    views: '756'
  }
]

// 动态状态
const cardStates = ref<Record<number, { isLiked: boolean; isFavorited: boolean }>>({})

// 初始化状态
baseDesignCards.forEach(card => {
  cardStates.value[card.id] = { isLiked: false, isFavorited: false }
})

// 合并静态数据和动态状态，并添加翻译
const designCards = computed(() => 
  baseDesignCards.map(card => ({
    ...card,
    designer: {
      name: $t('designer.name'),
      avatar: card.avatar
    },
    isLiked: cardStates.value[card.id]?.isLiked || false,
    isFavorited: cardStates.value[card.id]?.isFavorited || false
  }))
)

// 点赞功能
const toggleLike = (card: any) => {
  const state = cardStates.value[card.id]
  if (state) {
    state.isLiked = !state.isLiked
  }
}

// 收藏功能
const toggleFavorite = (card: any) => {
  const state = cardStates.value[card.id]
  if (state) {
    state.isFavorited = !state.isFavorited
  }
}

// 分享功能
const shareCard = (card: any) => {
  alert($t('action.share') + `: ${card.title}`)
}
</script>

<style scoped>
.text-orange {
  color: #f97316;
}

/* Fixed Header Styles */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content-wrapper {
  margin-top: 80px;
}

.btn-orange {
  background-color: #f97316;
  border-color: #f97316;
  color: white;
}

.btn-orange:hover {
  background-color: #ea580c;
  border-color: #ea580c;
}

.btn-outline-orange {
  border-color: #f97316;
  color: #f97316;
}

.btn-outline-orange:hover {
  background-color: #fff7ed;
  border-color: #f97316;
  color: #f97316;
}

.bg-orange {
  background-color: #f97316;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  padding: 0.5rem 1rem;
  position: relative;
}

.nav-link:hover {
  color: #f97316;
}

.nav-link.active {
  color: #f97316;
  font-weight: 500;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background-color: #f97316;
}

.dropdown-menu-mega {
  min-width: 700px;
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-item {
  font-size: 0.875rem;
  color: #6b7280;
  cursor: pointer;
}

.filter-item:hover {
  color: #f97316;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  position: relative;
  transition: all 0.2s ease;
}

.color-swatches-grid {
  display: grid;
  grid-template-columns: repeat(2, 40px);
  column-gap: 0.75rem;
  row-gap: 0.5rem;
}

.color-swatch:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.color-swatch[style*="ffffff"] {
  border: 2px solid #d1d5db;
}

.color-swatch.selected {
  border: 3px solid #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
  transform: scale(1.1);
}

.color-swatch.selected::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}

.custom-color-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  border: 2px solid #667eea !important;
}

.custom-color-btn:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.4);
}

.color-picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 2000;
  padding: 100px 0 0 20px;
}

.color-picker-dialog {
  background: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 280px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.color-picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.color-picker-header h6 {
  font-size: 0.9rem;
  margin: 0;
}

.color-picker-body {
  padding: 0.75rem;
}

.color-picker-body :deep(.vc-sketch) {
  box-shadow: none !important;
  padding: 0 !important;
  width: 100% !important;
}

.color-picker-body :deep(.vc-sketch-saturation-wrap) {
  padding-bottom: 65% !important;
}

.color-picker-body :deep(.vc-sketch-controls) {
  padding: 0 !important;
}

.color-picker-body :deep(.vc-sketch-field) {
  padding: 0 !important;
}

.color-picker-body :deep(.vc-input__input) {
  font-size: 12px !important;
  padding: 4px 6px !important;
}

.color-picker-body :deep(.vc-sketch-presets) {
  margin: 0 !important;
  padding: 8px 0 0 0 !important;
}

.color-picker-body :deep(.vc-sketch-presets-color) {
  width: 20px !important;
  height: 20px !important;
  margin: 0 4px 4px 0 !important;
}

.color-picker-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
}

.color-preview {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 2px solid #e5e7eb;
  flex-shrink: 0;
}

.object-fit-cover {
  object-fit: cover;
}

.featured-image-container {
  position: relative;
  height: 600px;
  overflow: hidden;
  border-radius: 0.5rem;
}

.info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%);
  color: white;
}

.btn-circle-action {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-size: 20px;
  cursor: pointer;
}

.btn-circle-action:hover {
  background: white;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.sidebar-filter {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-filter h6 {
  color: #111827;
  font-size: 0.95rem;
}

.sidebar-filter h6 i {
  color: #f97316;
}

.stat-item {
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.stat-item:hover {
  color: #f97316 !important;
  transform: scale(1.1);
}

.stat-item.active {
  color: #f97316 !important;
}

.stat-item.active i {
  color: #f97316;
}

.stat-item:active {
  transform: scale(0.95);
}
</style>
