import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { TreeView as MuiTreeView, TreeItem } from '@material-ui/lab';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';

import { RenderTree, TreeNodeType } from '../../common/generic.types';
import {
  getNavgiationNodes,
  getCompanyDetails,
  getEmployeeDetails,
} from '../../actions';
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
      getCompanyDetails,
      getEmployeeDetails,
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  navigationNodes?: RenderTree[];
  getNavgiationNodes: typeof getNavgiationNodes;
  getCompanyDetails: typeof getCompanyDetails;
  getEmployeeDetails: typeof getEmployeeDetails;
};

const TreeView: React.FC<Props> = ({
  navigationNodes,
  getNavgiationNodes,
  getCompanyDetails,
  getEmployeeDetails,
}) => {
  const classes = useStyles();
  const [expandedCompanyId, setExpandedCompanyId] = useState('');
  const [expandedJobAreaId, setExpandedJobAreaId] = useState('');
  const [expandedEmployeeId, setExpandedEmployeeId] = useState('');

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

  const handleItemClick = useCallback(
    (itemType: TreeNodeType, itemId: string) => {
      switch (itemType) {
        case TreeNodeType.COMPANY:
          getCompanyDetails(itemId);
          setExpandedCompanyId(itemId === expandedCompanyId ? '' : itemId);
          setExpandedJobAreaId('');
          setExpandedEmployeeId('');
          break;

        case TreeNodeType.JOBAREA:
          setExpandedJobAreaId(itemId === expandedJobAreaId ? '' : itemId);
          setExpandedEmployeeId('');
          break;

        case TreeNodeType.EMPLOYEE:
          getEmployeeDetails(itemId);
          setExpandedEmployeeId(itemId === expandedEmployeeId ? '' : itemId);
          break;

        default:
          break;
      }
    },
    [expandedCompanyId, expandedJobAreaId, expandedEmployeeId]
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
          onClick={() => handleItemClick(node.type, node.id)}
        >
          {Array.isArray(node.children)
            ? node.children.map((childNode) => renderTree(childNode))
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
        onClick={() => handleItemClick(nodes.type, nodes.id)}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((childNode) => renderTree(childNode))
          : null}
      </TreeItem>
    );
  };

  return (
    <MuiTreeView
      className={classes.root}
      expanded={[expandedCompanyId, expandedJobAreaId]}
    >
      {renderTree(navigationNodes)}
    </MuiTreeView>
  );
};

export default connector(TreeView);
