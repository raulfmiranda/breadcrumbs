var assignedCategories = undefined;
var pathNodes = [];

function getProductsAssignments() {
    return {
        B001: ['movies', 'fantasy'],
        D8: ['tolkien', 'root'],
        RX20: []
    };
}

function getCategories() {
    var root = { id: 'root', parent: null, children: [] };
    var books = { id: 'books', parent: root, children: [] };
    var movies = { id: 'movies', parent: root, children: [] };
    var fantasy = { id: 'fantasy', parent: books, children: [] };
    var tolkien = { id: 'tolkien', parent: fantasy, children: [] };

    root.children = [books, movies];
    books.children = [fantasy];
    fantasy.children = [tolkien];

    return root;
}

function getPaths(productID) {

    var root = getCategories();
    var assignments = getProductsAssignments();
    assignedCategories = assignments[productID];
    var breadCrumbs = [];

    if (assignedCategories) {
        treeSearch(root);
        breadCrumbs = createBreadCrumbs(pathNodes);
    }

    return breadCrumbs.length > 0 ? breadCrumbs : ['EMPTY'];
}

function treeSearch(tree) {

    savePathNode(tree);

    for (const branch of tree.children) {
        savePathNode(branch);
        treeSearch(branch);
    }
}

function savePathNode(node) {
    var isBreadCrumb = assignedCategories.includes(node.id);

    if (isBreadCrumb) {
        pathNodes.push(node);
        var index = assignedCategories.indexOf(node.id);
        assignedCategories.splice(index, 1);
    }
}

function createBreadCrumbs(nodes) {
    var breadCrumbs = [];
    var breadCrumbTxt;

    for (var node of nodes) {
        breadCrumbTxt = node.id;
        node = node.parent;

        while (node) {
            breadCrumbTxt = node.id + ';' + breadCrumbTxt;
            node = node.parent;
        }


        if (breadCrumbs.length < 1) {
            breadCrumbs.push(breadCrumbTxt);
        }

        for (const crumb of breadCrumbs) {
            if (!crumb.includes(breadCrumbTxt) && !breadCrumbTxt.includes(crumb)) {
                breadCrumbs.push(breadCrumbTxt);
            } else if (breadCrumbTxt.includes(crumb) && breadCrumbTxt.length > crumb.length) {
                var index = breadCrumbs.indexOf(crumb);
                // Swap short path for long path
                breadCrumbs[index] = breadCrumbTxt;
            }
        }
    }

    return breadCrumbs.sort();
}

function resetGlobal() {
    assignedCategories = undefined;
    pathNodes = [];
}

// Tests
console.log('INPUT:          OUTPUT: ', JSON.stringify(getPaths())); resetGlobal();
console.log('INPUT: XXXXXXXX OUTPUT: ', JSON.stringify(getPaths('XXXXXXXX'))); resetGlobal();
console.log('INPUT: RX20     OUTPUT: ', JSON.stringify(getPaths('RX20'))); resetGlobal();
console.log('INPUT: B001     OUTPUT: ', JSON.stringify(getPaths('B001'))); resetGlobal();
console.log('INPUT: D8       OUTPUT: ', JSON.stringify(getPaths('D8'))); resetGlobal();