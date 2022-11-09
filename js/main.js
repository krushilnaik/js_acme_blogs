/**
 *
 * @typedef {Object} User - schema of data returned from https://jsonplaceholder.typicode.com/users
 * @property {number} id
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
  //
}

/**
 * @param {User[]} data
 */
function createSelectOptions(data) {
  //
}

/**
 * @param {number} postId
 */
function toggleCommentSection(postId) {
  //
}

/**
 * @param {number} postId
 */
function toggleCommentButton(postId) {
  //
}

/**
 * @param {HTMLElement} parentElement
 */
function deleteChildElements(parentElement) {
  //
}

function addButtonListeners() {
  //
}

function removeButtonListeners() {
  //
}

/**
 * @param {Reply[]} comments
 */
function createComments(comments) {
  //
}

function populateSelectMenu() {
  //
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
