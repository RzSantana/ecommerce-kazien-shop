import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import 'react';
import { c as createComponent, a as createAstro, e as renderHead, d as renderSlot, b as renderTemplate } from './astro/server_Jm6e4f_N.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const buttonStyles = {
  primary: "bg-(--color-primary) hover:bg-[#FF3131]/70",
  secundary: "bg-[#F4F4F5] text-black hover:bg-[#F4F4F5]/70",
  outline: "border-1 border-gray-200/60 hover:border-transparent hover:bg-stone-800",
  destructive: "bg-[#7F1D1D] text-white hover:bg-[#7F1D1D]/70",
  ghost: "hover:bg-stone-800",
  link: "hover:underline hover:underline-offset-4"
};
function Button({ id, icon, text, type, onClick, href }) {
  return /* @__PURE__ */ jsx(Fragment, { children: type !== "link" && !href ? /* @__PURE__ */ jsxs(
    "button",
    {
      id,
      onClick,
      className: `
                    px-3 py-2 rounded-sm font-semibold
                    h-10
                    flex flex-row justify-center items-center gap-1
                    cursor-pointer
                    overflow-visible
                    [&>*]:h-full [&>*]:w-4
                    ${buttonStyles[type]}`,
      children: [
        icon,
        " ",
        text
      ]
    }
  ) : /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      className: `
                    px-3 py-2 rounded-sm font-semibold
                    h-10
                    flex flex-row justify-center items-center gap-1
                    cursor-pointer
                    overflow-visible
                    [&>*]:h-full [&>*]:w-4
                    ${buttonStyles[type]}`,
      children: [
        icon,
        " ",
        text
      ]
    }
  ) });
}

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="shortcut icon" href="/logo-color-primary.svg" type="image/x-icon"><title>Kaizen Auth - ${title}</title>${renderHead()}</head> <body class="w-screen h-screen font-[Onest] [&*>]:box-border"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, Button as B };
