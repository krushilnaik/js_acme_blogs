/**
 *
 * @typedef {Object} User - schema of data returned from https://jsonplaceholder.typicode.com/users
 * @property {number} id
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {any} address
 * @property {string} phone
 * @property {string} website
 * @property {any} company
 *
 *
 * @typedef {Object} Post - schema of data returned from https://jsonplaceholder.typicode.com/posts
 * @property {number} id
 * @property {string} title
 * @property {string} body
 * @property {number} userId
 *
 *
 * @typedef {Object} Reply - schema of data returned from https://jsonplaceholder.typicode.com/comments
 *                           (`Comment` is already a built-in type, apparently)
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} body
 * @property {number} postID
 *
 */

/**
 * @param {string} tagName
 * @param {string} textContent
 * @param {string} className
 */
function createElemWithText(tagName = "p", textContent = "", className = "") {
  const element = document.createElement(tagName);

  element.textContent = textContent;
  element.className = className;

  return element;
}

/**
 * @param {User[]} data
 */
function createSelectOptions(data) {
  if (!data) return undefined;

  return data.map((user) => {
    const option = document.createElement("option");

    option.value = user.id;
    option.textContent = user.name;

    return option;
  });
}

/**
 * @param {number} postId
 */
function toggleCommentSection(postId) {
  const section = document.querySelector(`section[data-post-id="${postId}"]`);

  if (!section) return;

  section.classList.toggle("hide");

  return section;
}

/**
 * @param {number} postId
 */
function toggleCommentButton(postId) {
  const button = document.querySelector(`section[data-post-id="${postId}"]`);

  if (!button) return;

  const newText = `${button.textContent.startsWith("Show") ? "Hide" : "Show"} Comments`;

  button.textContent = newText;

  return button;
}

/**
 * @param {HTMLElement} parentElement
 */
function deleteChildElements(parentElement) {
  const childElement = parentElement.lastElementChild();

  while (childElement) {
    parentElement.removeChild(childElement);

    childElement = parentElement.lastElementChild();
  }

  return parentElement;
}

function addButtonListeners() {
  const buttons = document.querySelectorAll("main button");

  if (buttons) {
    buttons.forEach((button) => {
      const { postId } = button.dataset;

      button.addEventListener("click", (event) => toggleComments(event, postId));
    });
  }

  return buttons;
}

function removeButtonListeners() {
  const buttons = document.querySelectorAll("main button");

  if (buttons) {
    buttons.forEach((button) => {
      const { postId } = button.dataset;

      button.removeEventListener("click", (event) => toggleComments(event, postId));
    });
  }

  return buttons;
}

/**
 * @param {Reply[]} comments
 */
function createComments(comments) {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const article = document.createElement("article");

    const name = createElemWithText("h3", comment.name);
    const body = createElemWithText("p", comment.body);
    const email = createElemWithText("p", `From: ${comment.email}`);

    article.append(name, body, email);

    fragment.append(article);
  });

  return fragment;
}

/**
 * @param {Users[]} users
 */
function populateSelectMenu(users) {
  const menu = document.getElementById("selectMenu");
  const options = createSelectOptions(users);

  menu.append(...options);

  return menu;
}

async function getUsers() {
  //
}

/**
 * @param {number} userId
 */
async function getUserPosts(userId) {
  //
}

/**
 * @param {number} userId
 */
async function getUser(userId) {
  //
}

/**
 * @param {number} postId
 */
async function getPostComments(postId) {
  //
}

/**
 * @param {number} postId
 */
async function displayComments(postId) {
  //
}

/**
 * @param {Post[]} posts
 */
async function createPosts(posts) {
  //
}

/**
 * @param {Post[]} posts
 */
async function displayPosts(posts) {
  //
}

/**
 * @param {Event} event
 * @param {number} postId
 */
async function toggleComments(event, postId) {
  //
}

/**
 * @param {Post[]} posts
 */
async function refreshPosts(posts) {
  //
}

/**
 * @param {Event} event
 */
async function selectMenuChangeEventHandler(event) {
  //
}

async function initPage() {
  //
}

async function initApp() {
  //
}

document.addEventListener("DOMContentLoaded", initApp);
