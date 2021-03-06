from typing import Optional

from webdnn.graph.axis import Axis
from webdnn.graph.operator import Operator
from webdnn.graph.order import OrderNTC, OrderNT, OrderNC
from webdnn.graph.variable import Variable


class Embedding(Operator):
    """Embedding(name)

    Word embedding operator.

    Args:
        name (str): Operator name.

    Signature
        .. code::

            y, = op(x, w)

        - **x** - Input variables. It must has 2 axes, :obj:`~webdnn.Axis.N`, :obj:`~webdnn.Axis.T`.
        - **w** - Dictionary variable. It must has :obj:`~webdnn.Axis.N`, and :obj:`~webdnn.Axis.C`.
          Its size of :obj:`~webdnn.Axis.C` must be same as the vocabulary size. Its size of :obj:`~webdnn.Axis.N`
          must be same as the embed feature size.
        - **y** - Output variable. Its order is :obj:`~webdnn.graph.order.OrderNTC`.
    """

    def __init__(self, name: Optional[str]):
        super().__init__(name)
        self.attributes = set()

    def __call__(self, x: Variable, w: Variable):
        self.append_input("x", x)
        self.append_input("w", w)

        # @TODO: this is too strict condition. It should be supported in optimization phase, not here.
        if x.order != OrderNT:
            raise NotImplementedError("Currently, Embedding supports only OrderNT variable for input sequence variable: "
                                      f"x.order={x.order}")

        x_shape_dict = x.shape_dict
        w_shape_dict = w.shape_dict

        assert w.order.check_same_axes(OrderNC), "Dictionary variable of Embedding operator must has only Axis.N and Axis.C: " \
                                                 f"w.order.axes={w.order.axes}"

        batch_size = x_shape_dict[Axis.N]
        sequence_len = x_shape_dict[Axis.T]
        embedding_dim = w_shape_dict[Axis.N]

        y = Variable([batch_size, sequence_len, embedding_dim], OrderNTC)

        self.append_output("y", y)
        return y,
