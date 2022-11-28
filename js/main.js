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

const JSON_PLACEHOLDER = "https://jsonplaceholder.typicode.com";

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
  if (postId == undefined || postId == null) return undefined;

  const section = document.querySelector(`section[data-post-id="${postId}"]`);

  if (!section) return null;

  section.classList.toggle("hide");

  return section;
}

/**
 * @param {number} postId
 */
function toggleCommentButton(postId) {
  if (postId == undefined || postId == null) return;

  const button = document.querySelector(`button[data-post-id="${postId}"]`);

  if (!button) return null;

  const newText = `${button.textContent.startsWith("Show") ? "Hide" : "Show"} Comments`;

  button.textContent = newText;

  return button;
}

/**
 * @param {HTMLElement} parentElement
 */
function deleteChildElements(parentElement) {
  if (!parentElement?.tagName) return;

  let childElement = parentElement.lastElementChild;

  while (childElement) {
    parentElement.removeChild(childElement);

    childElement = parentElement.lastElementChild;
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
  if (!comments) return;

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
  if (!users) return;

  const menu = document.getElementById("selectMenu");
  const options = createSelectOptions(users);

  menu.append(...options);

  return menu;
}

async function getUsers() {
  try {
    return await fetch(`${JSON_PLACEHOLDER}/users`).then((res) => res.json());
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {number} userId
 */
async function getUserPosts(userId) {
  if (!userId) return;

  try {
    return await fetch(`${JSON_PLACEHOLDER}/users/${userId}/posts`).then((res) =>
      res.json()
    );
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {number} userId
 */
async function getUser(userId) {
  if (!userId) return;

  try {
    return await fetch(`${JSON_PLACEHOLDER}/users/${userId}`).then((res) => res.json());
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {number} postId
 */
async function getPostComments(postId) {
  if (!postId) return;

  try {
    return await fetch(`${JSON_PLACEHOLDER}/posts/${postId}/comments`).then((res) =>
      res.json()
    );
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {number} postId
 */
async function displayComments(postId) {
  if (!postId) return;

  const comments = await getPostComments(postId);
  const section = document.createElement("section");

  section.dataset.postId = postId;
  section.className = "comments hide";

  const fragment = createComments(comments);

  section.append(fragment);

  return section;
}

/**
 * @param {Post[]} posts
 */
async function createPosts(posts) {
  if (posts == undefined || posts == null) return;

  const fragment = document.createDocumentFragment();

  for (const post of posts) {
    const article = document.createElement("article");
    const author = await getUser(post.userId);

    article.innerHTML += /*html*/ `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p>Post ID: ${post.id}</p>
      <p>Author: ${author.name} with ${author.company.name}</p>
      <p>${author.company.catchPhrase}</p>
      <button data-postId="${post.id}">Show Comments</button>
    `;

    const section = await displayComments(post.id);

    article.append(section);
    fragment.append(article);
  }

  return fragment;
}

/**
 * @param {Post[]} posts
 */
async function displayPosts(posts) {
  const main = document.querySelector("main");

  const element = posts
    ? await createPosts(posts)
    : createElemWithText("p", "Select an Employee to display their posts.");

  if (!posts) {
    element.className = "default-text";
  }

  main.append(element);

  return element;
}

/**
 * @param {Event} event
 * @param {number} postId
 */
function toggleComments(event, postId) {
  if (!event || postId == undefined || postId == null) return;

  let result = [];
  event.target.listener = true;
  result.push(toggleCommentSection(postId));
  result.push(toggleCommentButton(postId));
  return result;
}

/**
 * @param {Post[]} posts
 */
async function refreshPosts(posts) {
  if (!posts) return;

  const main = document.querySelector("main");

  return [
    removeButtonListeners(),
    deleteChildElements(main),
    await displayPosts(posts),
    addButtonListeners(),
  ];
}

/**
 * @param {Event} event
 */
async function selectMenuChangeEventHandler(event) {
  if (!event) return;

  const userId = event?.target?.value || 1;
  const posts = await getUserPosts(userId);
  const refreshPostsArray = await refreshPosts(posts);

  return [userId, posts, refreshPostsArray];
}

async function initPage() {
  const users = await getUsers();
  const select = populateSelectMenu(users);

  return [users, select];
}

async function initApp() {
  initPage();

  document
    .getElementById("selectMenu")
    .addEventListener("change", selectMenuChangeEventHandler);
}

document.addEventListener("DOMContentLoaded", initApp);
