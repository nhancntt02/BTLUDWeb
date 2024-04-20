import { createWebHistory, createRouter } from "vue-router";
import HomePage from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        name: "homePage",
        component: HomePage,
    },
    {
        path: "/publiser",
        name: "list_publisers",
        component: ()  => import("@/views/publiser/Publiser.vue"),
    },
    {
        path: "/book",
        name: "list_books",
        component: ()  => import("@/views/book/Book.vue"),
    },
    {
        path: "/reader",
        name: "list_readers",
        component: ()  => import("@/views/reader/Reader.vue"),
    },
    {
        path: "/flowbook",
        name: "flow_books",
        component: ()  => import("@/views/flowbook/FlowBook.vue"),
    },
    {
        path: "/editbook/:id",
        name: "edit-book",
        component: ()  => import("@/views/book/BookEdit.vue"),
        props: true
    },
    {
        path: "/addbook",
        name: "add_book",
        component: ()  => import("@/views/book/BookAdd.vue"),
    },
    {
        path: "/editpubliser/:id",
        name: "edit-nxb",
        component: ()  => import("@/views/publiser/PubliserEdit.vue"),
        props: true
    },
    {
        path: "/addpubliser",
        name: "add-nxb",
        component: ()  => import("@/views/publiser/PubliserAdd.vue"),
    },
    {
        path: "/editreader/:id",
        name: "edit_reader",
        component: ()  => import("@/views/reader/ReaderEdit.vue"),
        props: true
    },
    {
        path: "/addreader",
        name: "add_reader",
        component: ()  => import("@/views/reader/ReaderAdd.vue"),
    }, {
        path: "/edit/:id",
        name: "edit",
        component: ()  => import("@/views/flowbook/FlowBookEdit.vue"),
        props: true
    },
    {
        path: "/add",
        name: "add",
        component: ()  => import("@/views/flowbook/FlowBookAdd.vue"),
    },
    {
        path:"/login",
        name: "login",
        component: () => import("@/views/Login.vue")
    },
    {
        path:"/about",
        name: "about",
        component: () => import("@/views/About.vue")
    },
    {
        path: "/addstaff",
        name: "/addstaff",
        component: () => import("@/views/AddStaff.vue")
    }

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;