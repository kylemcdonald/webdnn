from typing import Tuple

import numpy as np

from webdnn.graph import traverse
from webdnn.graph.graph import Graph
from webdnn.graph.operators.scalar_add import ScalarAdd
from webdnn.graph.operators.scalar_affine import ScalarAffine
from webdnn.graph.operators.scalar_mul import ScalarMul
from webdnn.graph.optimize_rule import OptimizeRule
from webdnn.graph.variables.constant_variable import ConstantVariable
from webdnn.util import flags


class ReplaceScalarAffine(OptimizeRule):
    """
    Replace :class:`ScalarAffine` into :class:`ElementwiseMul` and :class:`ElementwiseAdd`
    """

    def flags(self):
        return [
            flags.optimize.OPTIMIZE,
            flags.optimize.SIMPLIFY_ELEMENTWISE,
            flags.optimize.REPLACE_SCALAR_OPERATOR
        ]

    def optimize(self, graph: Graph) -> Tuple[Graph, bool]:
        flag_changed = False
        for op in traverse.filter_nodes(traverse.listup_operators(graph), ScalarAffine):  # type: ScalarAffine
            x = op.inputs["x0"]
            y = op.outputs["y"]
            op.remove_all()

            scale = ConstantVariable(np.ones(x.shape) * op.scale, x.order)
            bias = ConstantVariable(np.ones(x.shape) * op.bias, x.order)

            y_dummy = x * scale + bias
            y_dummy.change_order(y.order)
            y_dummy.replace(y)

            flag_changed = True

        return graph, flag_changed


class ReplaceScalarAdd(OptimizeRule):
    """
    Replace :class:`ScalarAdd` into :class:`ElementwiseAdd`
    """

    def flags(self):
        return [
            flags.optimize.OPTIMIZE,
            flags.optimize.SIMPLIFY_ELEMENTWISE,
            flags.optimize.REPLACE_SCALAR_OPERATOR
        ]

    def optimize(self, graph: Graph) -> Tuple[Graph, bool]:
        flag_changed = False
        for op in traverse.filter_nodes(traverse.listup_operators(graph), ScalarAdd):  # type: ScalarAdd
            x = op.inputs["x0"]
            y = op.outputs["y"]
            op.remove_all()

            value = ConstantVariable(np.ones(x.shape) * op.value, x.order)

            y_dummy = x + value
            y_dummy.change_order(y.order)
            y_dummy.replace(y)

            flag_changed = True

        return graph, flag_changed


class ReplaceScalarMul(OptimizeRule):
    """
    Replace :class:`ScalarMul` into :class:`ElementwiseMul`
    """

    def flags(self):
        return [
            flags.optimize.OPTIMIZE,
            flags.optimize.SIMPLIFY_ELEMENTWISE,
            flags.optimize.REPLACE_SCALAR_OPERATOR
        ]

    def optimize(self, graph: Graph) -> Tuple[Graph, bool]:
        flag_changed = False
        for op in traverse.filter_nodes(traverse.listup_operators(graph), ScalarMul):  # type: ScalarMul
            x = op.inputs["x0"]
            y = op.outputs["y"]
            op.remove_all()

            value = ConstantVariable(np.ones(x.shape) * op.value, x.order)

            y_dummy = x * value
            y_dummy.change_order(y.order)
            y_dummy.replace(y)

            flag_changed = True

        return graph, flag_changed


class ReplaceScalarOperator(OptimizeRule):
    def __init__(self):
        super(ReplaceScalarOperator, self).__init__()
        self.register(ReplaceScalarAffine())
        self.register(ReplaceScalarAdd())
        self.register(ReplaceScalarMul())

    def flags(self):
        return [
            flags.optimize.OPTIMIZE,
            flags.optimize.SIMPLIFY_ELEMENTWISE,
            flags.optimize.REPLACE_SCALAR_OPERATOR
        ]
