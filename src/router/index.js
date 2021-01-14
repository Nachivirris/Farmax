import Vue from "vue";
import VueRouter from "vue-router";
import { createLogger } from "vuex";
import store from "../store"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: () => import("../views/Inicio.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/compras",
    name: "Compras",
    component: () => import("../views/Compras.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/compras/crear",
    name: "CrearCompra",
    component: () => import("../views/CrearCompra.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "compras/editar/:id",
    name: "EditarCompra",

    component: () => import("../views/EditarCompra.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/ventas",
    name: "Ventas",
    component: () => import("../views/Ventas.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/inventario",
    name: "Inventario",
    component: () => import("../views/Inventario.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/laboratorios",
    name: "Laboratorios",
    component: () => import("../views/Laboratorios.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/laboratorios/crear",
    name: "CrearLaboratorio",
    component: () => import("../views/CrearLaboratorio.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/proveedores",
    name: "Proveedores",
    component: () => import("../views/Proveedores.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/proveedores/crear",
    name: "CrearProveedor",
    component: () => import("../views/CrearProveedor.vue"),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/administracion",
    name: "Administracion",
    component: () => import("../views/Administracion.vue"),
    meta: {
      requiresAuth: true,
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) =>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters.usuarioAutenticado){
      //console.log("entro",store.getters.usuarioAutenticado)
      next();
    }else{
      //console.log("pacasas",store.getters.usuarioAutenticado)
      next("/login")
    }
  }else{
    next()
  }


})

export default router;
