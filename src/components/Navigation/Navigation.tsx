import React, { useEffect, useMemo } from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { TreeView as MuiTreeView, TreeItem } from '@material-ui/lab';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';

import { RenderTree, TreeNodeType } from '../../common/generic.types';
import { getNavgiationNodes } from '../../actions';
import { RootState } from '../../reducers';

import useStyles from './Navigation.styles';

const mapStateToProps = (state: RootState) => {
  return {
    navigationNodes: state.navNodes.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      getNavgiationNodes,
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigationNodes?: RenderTree[];
  getNavgiationNodes: typeof getNavgiationNodes;
};

const TreeView: React.FC<Props> = ({ navigationNodes, getNavgiationNodes }) => {
  const classes = useStyles();

  useEffect(() => {
    getNavgiationNodes();
  }, []);

  const IconComponent = useMemo(
    () => ({
      [TreeNodeType.COMPANY]: <BusinessIcon color='primary' fontSize='large' />,
      [TreeNodeType.JOBAREA]: <WorkIcon color='secondary' />,
      [TreeNodeType.EMPLOYEE]: <PersonIcon color='primary' />,
    }),
    []
  );

  const renderTree = (nodes: RenderTree[] | RenderTree) => {
    if (Array.isArray(nodes)) {
      return nodes.map((node) => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={node.name}
          icon={IconComponent[node.type]}
          className={classes.parentItem}
        >
          {Array.isArray(node.children)
            ? node.children.map((jobArea) => renderTree(jobArea))
            : null}
        </TreeItem>
      ));
    }

    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        icon={IconComponent[nodes.type]}
        className={classes.childItem}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((jobArea) => renderTree(jobArea))
          : null}
      </TreeItem>
    );
  };

  return (
    <MuiTreeView className={classes.root}>
      {renderTree(navigationNodes)}
    </MuiTreeView>
  );
};

export default connector(TreeView);
