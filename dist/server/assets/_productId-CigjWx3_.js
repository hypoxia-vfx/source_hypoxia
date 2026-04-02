import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { R as Route } from "./router-BkhwKZYp.js";
function RouteComponent() {
  const product = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 p-5", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full md:w-[55%]", children: /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, className: "w-full rounded-2xl object-cover" }) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-[45%] p-8", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block mb-4", children: "← Back to all products" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", children: product.name }),
      /* @__PURE__ */ jsx("p", { className: "mb-6", children: product.description }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
          "$",
          product.price.toLocaleString()
        ] }),
        /* @__PURE__ */ jsx("button", { className: "px-6 py-2 rounded-lg border", children: "Add to Cart" })
      ] })
    ] })
  ] });
}
export {
  RouteComponent as component
};
