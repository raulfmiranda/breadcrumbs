function getProductsAssignments() {
    return {
        B001: ['movies', 'fantasy'],
        D8: ['tolkien', 'root'],
        C1: ['tolkien', 'fantasy'],
        RX20: []
    };
}

function getCategories() {
    var root = {id: 'root', parent: null, children: []};
    var books = {id: 'books', parent: root, children: []};
    var movies = {id: 'movies', parent: root, children: []};
    var fantasy = {id: 'fantasy', parent: books, children: []};
    var tolkien = {id: 'tolkien', parent: fantasy, children: []};

    root.children = [books, movies];
    books.children = [fantasy];
    fantasy.children = [tolkien];

    return root;
}

var assignedCategories = undefined;
var pathNodes = [];

function getPaths(productID) {
    var root = getCategories();
    var assignments = getProductsAssignments();
    assignedCategories = assignments[productID];

    treeSearch(root);
    var breadCrumbs = createBreadCrumbs(pathNodes);

    return breadCrumbs.length > 0 ? breadCrumbs : ['EMPTY'];
}

function treeSearch(tree) {
    for (const branch of tree.children) {

        var isBreadCrumb = assignedCategories.includes(branch.id);
        
        if(isBreadCrumb) {
            pathNodes.push(branch);
            var index = assignedCategories.indexOf(branch.id);
            assignedCategories.splice(index, 1);
        }

        treeSearch(branch);
    }
}

function createBreadCrumbs(nodes) {
    var breadCrumbs = [];
    var breadCrumbTxt;
    
    for (var node of nodes) {
        breadCrumbTxt = node.id;
        node = node.parent;

        while(node) {
            breadCrumbTxt = node.id + ';' + breadCrumbTxt;
            node = node.parent;
        }
        

        if(breadCrumbs.length < 1) {
            breadCrumbs.push(breadCrumbTxt);
        }

        for (const crumb of breadCrumbs) {
            if(!crumb.includes(breadCrumbTxt) && !breadCrumbTxt.includes(crumb)) {
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

var result = console.log(getPaths('B001'));