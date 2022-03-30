function createElement(tag, className, id) {
  const el = document.createElement(tag);
  if (className) {
    const classes = className.split(' ');
    el.classList.add(...classes);
  }

  if (id) {
    el.id = id;
  }
  return el;
}

function getElement(selector) {
  const el = document.querySelector(selector);
  return el;
}

export default { createElement, getElement };
