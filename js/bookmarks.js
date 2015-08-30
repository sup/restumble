// Main Browser Action: Click icon to go to random bookmark
chrome.browserAction.onClicked.addListener(function() {
	// Process bookmarks tree
	chrome.bookmarks.getTree(function(bookmarks){
		var allurls = [];
		bookmarks.forEach(function(treenode){
			allurls = allurls.concat(processNode(treenode));
		});
		var rand_bm = allurls[Math.floor(Math.random()*allurls.length)];
		chrome.tabs.update({url: rand_bm});
	});
});

// processNode: Recursively traverse bookmarks tree to 
// create a flattened list
// 
// requires: a bookmark treenode
// returns: flattened list of urls
function processNode(node) {
	var urls = [];
	// If we are at a folder, we have children
	if (node.children){
		// Iteratively process each childNode with processNode
		node.children.forEach(function(childNode){
			urls = urls.concat(processNode(childNode));
		});
		return urls;
	}
	// If we have a url, return it as a list to concatenate
	if (node.url) {
		return [node.url];
	}
}