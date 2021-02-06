import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { TreeView, TreeItem } from '@material-ui/lab';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';

import { RenderTree, TreeNodeType } from '../../common/generic.types';
import {
  getNavgiationNodes,
  getCompanyDetails,
  getEmployeeDetails,
  showJobAreaDetails,
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
      showJobAreaDetails,
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
  showJobAreaDetails: typeof showJobAreaDetails;
};

const Navigation: React.FC<Props> = ({
  navigationNodes,
  getNavgiationNodes,
  getCompanyDetails,
  getEmployeeDetails,
  showJobAreaDetails,
}) => {
  const classes = useStyles();
  const [expandedCompanyId, setExpandedCompanyId] = useState('');
  const [expandedJobAreaId, setExpandedJobAreaId] = useState('');
  const [expandedEmployeeId, setExpandedEmployeeId] = useState('');

  useEffect(() => {
    getNavgiationNodes();
    // we only need to fetch the nodes ones the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    (item: RenderTree) => {
      switch (item.type) {
        case TreeNodeType.COMPANY:
          getCompanyDetails(item.id);
          setExpandedCompanyId(item.id);
          setExpandedJobAreaId('');
          setExpandedEmployeeId('');
          break;

        case TreeNodeType.JOBAREA:
          setExpandedJobAreaId(item.id);
          setExpandedEmployeeId('');
          showJobAreaDetails(item.id, item.children);
          break;

        case TreeNodeType.EMPLOYEE:
          getEmployeeDetails(item.id);
          setExpandedEmployeeId(item.id);
          break;

        default:
          break;
      }
    },
    // we only care when the id of the expanded items have changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          onClick={() => handleItemClick(node)}
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
        onClick={() => handleItemClick(nodes)}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((childNode) => renderTree(childNode))
          : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      className={classes.root}
      expanded={[expandedCompanyId, expandedJobAreaId]}
    >
      {renderTree(navigationNodes)}
    </TreeView>
  );
};

export default connector(Navigation);
