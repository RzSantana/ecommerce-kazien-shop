import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Jm6e4f_N.mjs';
import 'kleur/colors';
import { I as Input, $ as $$AuthLayout } from '../../chunks/AuthLayout_C4LOdpHy.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button } from '../../chunks/MainLayout_CHVZOOWF.mjs';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

function RegisterForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);
  const handleClickToggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleClickToggleShowRepeatPassword = () => {
    setIsShowRepeatPassword(!isShowRepeatPassword);
  };
  return /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(Input, { type: "text", name: "username", placeholder: "Name" }),
      /* @__PURE__ */ jsx(Input, { type: "text", name: "email", placeholder: "Email" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: isShowPassword ? "text" : "password",
          name: "password",
          placeholder: "Password",
          action: {
            callback: handleClickToggleShowPassword,
            default: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faEyeSlash }),
            active: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faEye })
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: isShowRepeatPassword ? "text" : "password",
          name: "repeat-password",
          placeholder: "Repeat Password",
          action: {
            callback: handleClickToggleShowRepeatPassword,
            default: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faEyeSlash }),
            active: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faEye })
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(Button, { text: "Join now", type: "primary" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          text: "Sing in with Google",
          type: "secundary",
          icon: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faGoogle, size: "lg" })
        }
      )
    ] })
  ] });
}

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Join Kaizen", "subtitle": "Complete your registration and enjoy exclusive benefits" }, { "footer": ($$result2) => renderTemplate`${maybeRenderHead()}<span>
Already have an account? ${renderComponent($$result2, "Button", Button, { "text": "Log in", "type": "link", "href": "/auth/login" })} </span>`, "form": ($$result2) => renderTemplate`${renderComponent($$result2, "RegisterForm", RegisterForm, { "slot": "form", "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/authForm/RegisterForm", "client:component-export": "default" })}` })}`;
}, "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/pages/auth/register.astro", void 0);

const $$file = "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/pages/auth/register.astro";
const $$url = "/auth/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Register,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
