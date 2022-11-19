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

  let element = document.querySelector(`section[data-post-id="${postId}"]`);

  if (element) element.classList.toggle("hide");

  return element;
}

/**
 * @param {number} postId
 */
function toggleCommentButton(postId) {
  if (!postId) return;

  let element = document.querySelector(`button[data-post-id="${postId}"]`);

  if (element) {
    element.textContent =
      element.textContent == "Show Comments" ? "Hide Comments" : "Show Comments";
  }

  return element;
}

/**
 * @param {HTMLElement} parentElement
 */
function deleteChildElements(parentElement) {
  if (!parentElement?.tagName) return;

  let child = parentElement.lastElementChild;

  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
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

  let fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    let article = document.createElement("article");

    article.append(createElemWithText("h3", comment.name));
    article.append(createElemWithText("p", comment.body));
    article.append(createElemWithText("p", `From: ${comment.email}`));

    fragment.append(article);
  });
  return fragment;
}

/**
 * @param {Users[]} users
 */
function populateSelectMenu(users) {
  if (!users) return;

  let menu = document.getElementById("selectMenu");
  let options = createSelectOptions(users);

  options.forEach((option) => menu.append(option));

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

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let article = document.createElement("article");

    article.append(createElemWithText("h2", post.title));
    article.append(createElemWithText("p", post.body));
    article.append(createElemWithText("p", `Post ID: ${post.id}`));

    let author = await getUser(post.userId);

    article.append(
      createElemWithText("p", `Author: ${author.name} with ${author.company.name}`)
    );

    article.append(createElemWithText("p", author.company.catchPhrase));

    let button = createElemWithText("button", "Show Comments");

    button.dataset.postId = post.id;
    article.append(button);

    let section = await displayComments(post.id);

    article.append(section);
    fragment.append(article);
  }
  return fragment;
}

/**
 * @param {Post[]} posts
 */
async function displayPosts(posts) {
  let main = document.querySelector("main");
  let element;
  if (posts != undefined && posts != null) {
    element = await createPosts(posts);
    //console.log(element);
  } else {
    element = createElemWithText("p", "Select an Employee to display their posts.");
    element.classList.add("default-text");
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
  let userId = event?.target?.value || 1;
  let posts = await getUserPosts(userId);
  let refreshPostsArray = await refreshPosts(posts);
  //console.log(result);
  return [userId, posts, refreshPostsArray];
}

async function initPage() {
  let users = await getUsers();
  let select = populateSelectMenu(users);

  return [users, select];
}

async function initApp() {
  initPage();

  let menu = document.getElementById("selectMenu");
  menu.addEventListener("change", selectMenuChangeEventHandler);
}

document.addEventListener("DOMContentLoaded", initApp);
