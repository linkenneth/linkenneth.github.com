function initGraph() {
  var sigInst = sigma.init(document.getElementById('skill-graph')).drawingProperties({
    defaultLabelColor: '#fff',
    defaultLabelSize: 14,
    defaultLabelBGColor: '#fff',
    defaultLabelHoverColor: '#000',
    labelThreshold: 10,  // displays skills over 50 at default zoom
    defaultEdgeType: 'curve'
  }).graphProperties({
    minNodeSize: 1,
    maxNodeSize: 20,
    minEdgeSize: 1,
    maxEdgeSize: 1
  }).mouseProperties({
    maxRatio: 4
  });
  
  sigInst.parseGexf('graph/graph.gexf');

  // scale size by skill level
  sigInst.iterNodes( function(node) {
    node['size'] = node['attr']['attributes']['skill-level'] ?
      node['attr']['attributes']['skill-level'] : 30;
    if (node['attr']['attributes']['type'] === 'library') {
      node['size'] *= 0.7;  // displays if over ~65 at defaut zoom
    }
  });

  // // Bind events :
  // var GREY = '#666';
  // sigInst.bind('overnodes',function(event){
  //   var nodes = event.content;
  //   var neighbors = { node : 1 };
  //   sigInst.iterEdges( function(e) {
  //     if (nodes.indexOf(e.source) < 0 && nodes.indexOf(e.target) < 0) {
  // 	// if edge doesn't connect the node
  //       if (!e.attr['grey']) {
  //         e.attr['true_color'] = e.color;
  //         e.color = GREY;
  //         e.attr['grey'] = 1;
  //       }
  //     } else {  // if edge connects node at all
  //       e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
  //       e.attr['grey'] = 0;
	
  //       neighbors[e.source] = 1;
  //       neighbors[e.target] = 1;
  //     }
  //   }).iterNodes( function(n) {
  //     if (!neighbors[n.id]) {
  //       if (!n.attr['grey']){
  //         n.attr['true_color'] = n.color;
  //         n.color = GREY;
  //         n.attr['grey'] = 1;
  //       }
  //     } else {
  //       n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
  //       n.attr['grey'] = 0;
  //     }
  //   }).draw(2,2,2);
  // }).bind('outnodes', function() {
  //   sigInst.iterEdges( function(e) {
  //     e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
  //     e.attr['grey'] = 0;
  //   }).iterNodes( function(n) {
  //     n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
  //     n.attr['grey'] = 0;
  //   }).draw(2,2,2);
  // });

  // Draw the graph :
  sigInst.draw();
}

$(window).load( function() { initGraph(); } );
