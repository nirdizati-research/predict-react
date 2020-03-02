/* eslint-disable max-len */
import React from 'react';
import {Graphviz} from 'graphviz-react';
class DecisionTree extends React.Component {
    constructor(props) {
        super(props);
      }
      render() {
        return <Graphviz dot={`digraph Tree {
            node [color="black", fontname=helvetica, shape=box, style="filled, rounded"];
            edge [fontname=helvetica];
            0 [fillcolor=cornsilk, label=<node &#35;0<br/>prefix_1 &le; 23.5<br/>gini = 0.5<br/>samples = 100.0%<br/>value = [0.5, 0.5]<br/>class = prefix_2>];
            1 [fillcolor=cornsilk, label=<node &#35;1<br/>prefix_2 &le; 30.5<br/>gini = 0.38<br/>samples = 64.8%<br/>value = [0.255, 0.745]<br/>class = prefix_2>];
            0 -> 1  [color=steelblue, headlabel="True", labelangle=45, labeldistance="2.5"];
            2 [fillcolor=cornsilk, label=<node &#35;2<br/>prefix_2 &le; 3.5<br/>gini = 0.123<br/>samples = 53.9%<br/>value = [0.066, 0.934]<br/>class = prefix_2>];
            1 -> 2  [color=steelblue];
            3 [fillcolor=coral, label=<node &#35;3<br/>gini = 0.0<br/>samples = 0.4%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            2 -> 3  [color=steelblue];
            4 [fillcolor=cornsilk, label=<node &#35;4<br/>prefix_1 &le; 12.5<br/>gini = 0.099<br/>samples = 53.5%<br/>value = [0.052, 0.948]<br/>class = prefix_2>];
            2 -> 4  [color=steelblue];
            5 [fillcolor=lightsteelblue, label=<node &#35;5<br/>gini = 0.0<br/>samples = 28.5%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            4 -> 5  [color=steelblue];
            6 [fillcolor=cornsilk, label=<node &#35;6<br/>prefix_2 &le; 9.0<br/>gini = 0.193<br/>samples = 25.0%<br/>value = [0.108, 0.892]<br/>class = prefix_2>];
            4 -> 6  [color=steelblue];
            7 [fillcolor=lightsteelblue, label=<node &#35;7<br/>gini = -0.0<br/>samples = 20.2%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            6 -> 7  [color=steelblue];
            8 [fillcolor=cornsilk, label=<node &#35;8<br/>prefix_1 &le; 20.0<br/>gini = 0.498<br/>samples = 4.7%<br/>value = [0.472, 0.528]<br/>class = prefix_2>];
            6 -> 8  [color=steelblue];
            9 [fillcolor=coral, label=<node &#35;9<br/>gini = 0.305<br/>samples = 2.2%<br/>value = [0.812, 0.188]<br/>class = prefix_1>];
            8 -> 9  [color=steelblue];
            12 [fillcolor=lightsteelblue, label=<node &#35;12<br/>gini = 0.0<br/>samples = 2.5%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            8 -> 12  [color=steelblue];
            13 [fillcolor=cornsilk, label=<node &#35;13<br/>prefix_1 &le; 11.5<br/>gini = 0.261<br/>samples = 10.9%<br/>value = [0.846, 0.154]<br/>class = prefix_1>];
            1 -> 13  [color=steelblue];
            14 [fillcolor=cornsilk, label=<node &#35;14<br/>prefix_2 &le; 35.5<br/>gini = 0.498<br/>samples = 3.1%<br/>value = [0.467, 0.533]<br/>class = prefix_2>];
            13 -> 14  [color=steelblue];
            15 [fillcolor=coral, label=<node &#35;15<br/>gini = 0.0<br/>samples = 0.4%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            14 -> 15  [color=steelblue];
            16 [fillcolor=cornsilk, label=<node &#35;16<br/>prefix_1 &le; 5.5<br/>gini = 0.44<br/>samples = 2.6%<br/>value = [0.327, 0.673]<br/>class = prefix_2>];
            14 -> 16  [color=steelblue];
            17 [fillcolor=coral, label=<node &#35;17<br/>gini = 0.411<br/>samples = 0.8%<br/>value = [0.711, 0.289]<br/>class = prefix_1>];
            16 -> 17  [color=steelblue];
            20 [fillcolor=cornsilk, label=<node &#35;20<br/>prefix_2 &le; 44.5<br/>gini = 0.186<br/>samples = 1.9%<br/>value = [0.104, 0.896]<br/>class = prefix_2>];
            16 -> 20  [color=steelblue];
            21 [fillcolor=lightsteelblue, label=<node &#35;21<br/>gini = 0.0<br/>samples = 1.8%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            20 -> 21  [color=steelblue];
            22 [fillcolor=coral, label=<node &#35;22<br/>gini = 0.0<br/>samples = 0.1%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            20 -> 22  [color=steelblue];
            23 [fillcolor=cornsilk, label=<node &#35;23<br/>prefix_1 &le; 19.5<br/>gini = 0.091<br/>samples = 7.8%<br/>value = [0.952, 0.048]<br/>class = prefix_1>];
            13 -> 23  [color=steelblue];
            24 [fillcolor=coral, label=<node &#35;24<br/>gini = 0.0<br/>samples = 7.2%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            23 -> 24  [color=steelblue];
            25 [fillcolor=lightsteelblue, label=<node &#35;25<br/>gini = 0.0<br/>samples = 0.7%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            23 -> 25  [color=steelblue];
            26 [fillcolor=cornsilk, label=<node &#35;26<br/>prefix_2 &le; 7.0<br/>gini = 0.297<br/>samples = 35.2%<br/>value = [0.819, 0.181]<br/>class = prefix_1>];
            0 -> 26  [color=steelblue, headlabel="False", labelangle="-45", labeldistance="2.5"];
            27 [fillcolor=cornsilk, label=<node &#35;27<br/>prefix_2 &le; 3.5<br/>gini = 0.124<br/>samples = 3.0%<br/>value = [0.066, 0.934]<br/>class = prefix_2>];
            26 -> 27  [color=steelblue];
            28 [fillcolor=coral, label=<node &#35;28<br/>gini = 0.0<br/>samples = 0.1%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            27 -> 28  [color=steelblue];
            29 [fillcolor=lightsteelblue, label=<node &#35;29<br/>gini = 0.0<br/>samples = 2.9%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            27 -> 29  [color=steelblue];
            30 [fillcolor=cornsilk, label=<node &#35;30<br/>prefix_2 &le; 42.5<br/>gini = 0.238<br/>samples = 32.2%<br/>value = [0.862, 0.138]<br/>class = prefix_1>];
            26 -> 30  [color=steelblue];
            31 [fillcolor=cornsilk, label=<node &#35;31<br/>prefix_1 &le; 24.5<br/>gini = 0.179<br/>samples = 29.8%<br/>value = [0.9, 0.1]<br/>class = prefix_1>];
            30 -> 31  [color=steelblue];
            32 [fillcolor=coral, label=<node &#35;32<br/>gini = 0.0<br/>samples = 13.2%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            31 -> 32  [color=steelblue];
            33 [fillcolor=cornsilk, label=<node &#35;33<br/>prefix_2 &le; 23.5<br/>gini = 0.31<br/>samples = 16.6%<br/>value = [0.808, 0.192]<br/>class = prefix_1>];
            31 -> 33  [color=steelblue];
            34 [fillcolor=cornsilk, label=<node &#35;34<br/>prefix_2 &le; 11.5<br/>gini = 0.07<br/>samples = 11.9%<br/>value = [0.964, 0.036]<br/>class = prefix_1>];
            33 -> 34  [color=steelblue];
            35 [fillcolor=coral, label=<node &#35;35<br/>gini = 0.0<br/>samples = 9.5%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            34 -> 35  [color=steelblue];
            36 [fillcolor=cornsilk, label=<node &#35;36<br/>prefix_2 &le; 15.5<br/>gini = 0.322<br/>samples = 2.4%<br/>value = [0.799, 0.201]<br/>class = prefix_1>];
            34 -> 36  [color=steelblue];
            37 [fillcolor=lightsteelblue, label=<node &#35;37<br/>gini = 0.0<br/>samples = 0.8%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            36 -> 37  [color=steelblue];
            38 [fillcolor=coral, label=<node &#35;38<br/>gini = -0.0<br/>samples = 1.7%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            36 -> 38  [color=steelblue];
            39 [fillcolor=cornsilk, label=<node &#35;39<br/>prefix_2 &le; 38.5<br/>gini = 0.268<br/>samples = 4.7%<br/>value = [0.159, 0.841]<br/>class = prefix_2>];
            33 -> 39  [color=steelblue];
            40 [fillcolor=lightsteelblue, label=<node &#35;40<br/>gini = 0.0<br/>samples = 4.3%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            39 -> 40  [color=steelblue];
            41 [fillcolor=coral, label=<node &#35;41<br/>gini = 0.0<br/>samples = 0.4%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            39 -> 41  [color=steelblue];
            42 [fillcolor=cornsilk, label=<node &#35;42<br/>prefix_2 &le; 45.0<br/>gini = 0.149<br/>samples = 2.4%<br/>value = [0.081, 0.919]<br/>class = prefix_2>];
            30 -> 42  [color=steelblue];
            43 [fillcolor=lightsteelblue, label=<node &#35;43<br/>gini = 0.0<br/>samples = 2.3%<br/>value = [0.0, 1.0]<br/>class = prefix_2>];
            42 -> 43  [color=steelblue];
            44 [fillcolor=coral, label=<node &#35;44<br/>gini = -0.0<br/>samples = 0.1%<br/>value = [1.0, 0.0]<br/>class = prefix_1>];
            42 -> 44  [color=steelblue];
            }`} />
          ;
    }
}

export default DecisionTree;
