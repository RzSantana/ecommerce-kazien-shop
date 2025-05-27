import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as renderSlot } from './astro/server_Jm6e4f_N.mjs';
import 'kleur/colors';
import { B as Button, $ as $$MainLayout } from './MainLayout_CHVZOOWF.mjs';

function Input({
  type,
  name,
  placeholder,
  action,
  value
}) {
  const [isActiveAction, setIsActiveAction] = useState(false);
  const handleClick = () => {
    action?.callback();
    setIsActiveAction(!isActiveAction);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex justify-center items-center", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        value,
        name,
        type: type ?? "text",
        placeholder,
        className: "min-w-2xs h-8 px-4 py-4.5\r\n                bg-[#27272A]/80 rounded-sm\r\n                border-1 border-gray-200/60\r\n                focus-visible:outline-none focus-visible:border-gray-200"
      }
    ),
    action ? /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: handleClick,
        className: "absolute right-4 top-0\r\n                    w-5 h-9 [&>*]:w-full\r\n                    flex items-center cursor-pointer",
        children: !isActiveAction ? action.default : action.active
      }
    ) : null
  ] });
}

const $$Astro = createAstro();
const $$AuthLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthLayout;
  const { title, subtitle } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="w-full h-full bg-stone-900 px-8 pt-8 pb-24 flex flex-col text-white"> <div class="flex justify-start"> ${renderComponent($$result2, "Button", Button, { "text": "Go Back", "type": "link", "href": "/", "icon": "\u2190" })} </div> <section class="w-full h-full
            flex flex-col gap-8
            justify-center items-center"> <!-- Logo --> <img class="w-12" src="/logo-color-primary.svg" alt=""> <!-- Title Container --> <div class="flex flex-col text-center gap-1"> <h1 class="uppercase font-black text-5xl"> ${title ?? "Default Title"} </h1> <h2> ${subtitle ?? "Default Subtitle"} </h2> </div> <div> ${renderSlot($$result2, $$slots["form"])} </div> </section> <div class="text-center text-xs
            [&>*]:w-full [&>*]:h-fit [&>*]:[&>*]:px-0
            [&>*]:flex [&>*]:flex-row [&>*]:gap-x-1
            [&>*]:justify-center [&>*]:items-center"> ${renderSlot($$result2, $$slots["footer"])} </div> </main> ` })}`;
}, "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/layouts/AuthLayout.astro", void 0);

export { $$AuthLayout as $, Input as I };
