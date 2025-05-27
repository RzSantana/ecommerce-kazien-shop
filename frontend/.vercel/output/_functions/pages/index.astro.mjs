import { c as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, d as renderSlot } from '../chunks/astro/server_Jm6e4f_N.mjs';
import 'kleur/colors';
import { B as Button, $ as $$MainLayout } from '../chunks/MainLayout_CHVZOOWF.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
export { renderers } from '../renderers.mjs';

function ActionsHeaderClient() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        text: "",
        type: "link",
        icon: /* @__PURE__ */ jsx(
          FontAwesomeIcon,
          {
            icon: faSearch,
            className: "max-w-4 max-h-4"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        text: "",
        type: "link",
        icon: /* @__PURE__ */ jsx(
          FontAwesomeIcon,
          {
            icon: faShoppingCart,
            className: "max-w-4 max-h-4"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(Button, { text: "Login", type: "primary", href: "/auth/login" })
  ] });
}

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="box-border
    fixed top-0 left-0 z-50
    w-full
    px-8 py-8"> <div class="px-12 py-1.5
        grid grid-cols-[1fr_auto_1fr] [&>*]:items-center
        text-white bg-stone-900/50 backdrop-blur-lg rounded-xl"> <!-- Logo --> <div class="flex flex-row gap-4 py-1 select-none"> <img class="h-full w-8" src="/logo-color-primary.svg" alt="Logo de la marca Kaizen Shop"> <span class="uppercase text-3xl font-black">Kaizen</span> </div> <!-- Navegación --> <nav class="flex flex-row justify-center gap-12
        [&>*]:font-light [&>*]:text-md"> ${renderComponent($$result, "Button", Button, { "text": "HOME", "type": "link", "href": "/" })} ${renderComponent($$result, "Button", Button, { "text": "SHOP", "type": "link", "href": "/" })} ${renderComponent($$result, "Button", Button, { "text": "DROPS", "type": "link", "href": "/" })} ${renderComponent($$result, "Button", Button, { "text": "CONTACT", "type": "link", "href": "/" })} </nav> <!-- Acciones --> <div class="flex flex-row justify-end gap-4"> ${renderComponent($$result, "ActionsHeaderClient", ActionsHeaderClient, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/ActionsHeaderClient", "client:component-export": "ActionsHeaderClient" })} </div> </div> </header>`;
}, "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/components/Header.astro", void 0);

const $$ClientLayout = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderSlot($$result2, $$slots["default"])} ${maybeRenderHead()}<footer></footer> ` })}`;
}, "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/layouts/ClientLayout.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "ClientLayout", $$ClientLayout, {}, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="h-[calc(100vh-50px)] relative"> <img class="w-full h-full object-cover" src="/kickboxing-entrenamiento-gimnasio-profesional.webp" alt="Kickboxing training in gym - fighter celebrating victory" title="Combate profesional de kickboxing y muay thai" loading="eager" decoding="async" fetchpriority="high"> <div class="absolute top-0 left-0 w-screen h-[calc(100vh-50px)]
        flex flex-col justify-center items-center gap-6"> <div class="flex flex-col text-center items-center"> <h1 class="uppercase font-black text-5xl text-(--color-primary)">
KAIZEN PHILOSOPHY
</h1> <h2 class="uppercase font-semibold text-xl text-white max-w-md text-center">
Everything you need to evolve into your martial art
</h2> </div> ${renderComponent($$result2, "Button", Button, { "text": "EXPLORE OUR VISION", "type": "secundary" })} </div> </section>  <div class="w-screen flex flex-row py-1.5
        [&>*]:flex [&>*]:flex-row [&>*]:justify-between [&>*]:gap-2.5 [&>*]:min-w-full
        font-extrabold text-2xl [&>*]:text-nowrap [&>*]:select-none
        bg-(--color-primary) overflow-hidden
        [&>*]:animate-inifinit-sroll"> <div> <span>★</span> <span>FREE SHIPPING +50€</span> <span>★</span> <span>CONTINUOUS IMPROVEMENT</span> <span>★</span> <span>EQUIPMENT TESTED BY PROFESSIONALS</span> <span>★</span> <span>CONTINUOUS IMPROVEMENT</span> <span></span> </div> <div aria-hidden="true"> <span>★</span> <span>FREE SHIPPING +50€</span> <span>★</span> <span>CONTINUOUS IMPROVEMENT</span> <span>★</span> <span>EQUIPMENT TESTED BY PROFESSIONALS</span> <span>★</span> <span>CONTINUOUS IMPROVEMENT</span> <span></span> </div> </div>  ` })}`;
}, "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/pages/index.astro", void 0);

const $$file = "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
