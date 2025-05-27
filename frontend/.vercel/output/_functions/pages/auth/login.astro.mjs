import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Jm6e4f_N.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button } from '../../chunks/MainLayout_CHVZOOWF.mjs';
import { I as Input, $ as $$AuthLayout } from '../../chunks/AuthLayout_C4LOdpHy.mjs';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
export { renderers } from '../../renderers.mjs';

async function signIn(providerId, options, authorizationParams) {
  const { callbackUrl = window.location.href, redirect = true } = {};
  const { prefix = "/api/auth", ...opts } = {};
  const signInUrl = `${prefix}/${"signin"}/${providerId}`;
  const _signInUrl = `${signInUrl}?${new URLSearchParams(authorizationParams)}`;
  const csrfTokenResponse = await fetch(`${prefix}/csrf`);
  const { csrfToken } = await csrfTokenResponse.json();
  const res = await fetch(_signInUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1"
    },
    // @ts-expect-error -- ignore
    body: new URLSearchParams({
      ...opts,
      csrfToken,
      callbackUrl
    })
  });
  const data = await res.clone().json();
  new URL(data.url).searchParams.get("error");
  {
    window.location.href = data.url ?? callbackUrl;
    if (data.url.includes("#")) window.location.reload();
    return;
  }
}

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleClickToggleShow = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleGoogleLogin = () => {
    console.log("hello world");
    signIn("google");
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(Input, { type: "text", name: "email", placeholder: "Email" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: isShowPassword ? "text" : "password",
          name: "password",
          placeholder: "Password",
          action: {
            default: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faEyeSlash }),
            active: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faEye }),
            callback: handleClickToggleShow
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(Button, { text: "Log in", type: "primary", onClick: handleSubmit }),
      /* @__PURE__ */ jsx(
        Button,
        {
          text: "Sing in with Google",
          type: "secundary",
          icon: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faGoogle, size: "lg" }),
          onClick: handleGoogleLogin
        }
      )
    ] })
  ] });
}

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Personal Access", "subtitle": "Control and tracking of your purchases" }, { "footer": ($$result2) => renderTemplate`${maybeRenderHead()}<span>
Dont't have an account? ${renderComponent($$result2, "Button", Button, { "text": "Sing up", "type": "link", "href": "/auth/register" })} </span>`, "form": ($$result2) => renderTemplate`${renderComponent($$result2, "LoginForm", LoginForm, { "slot": "form", "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/authForm/LoginForm", "client:component-export": "default" })}` })}`;
}, "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/pages/auth/login.astro", void 0);

const $$file = "D:/Code/proyects/ecommerce-kazien-shop/frontend/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
