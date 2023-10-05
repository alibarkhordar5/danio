import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
//
import { navVerticalConfig } from '../config';
import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavSectionVertical({ data, config, sx, ...other }) {
  return (
    <Stack sx={sx} {...other}>
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          subheader={group.subheader}
          items={group.items}
          config={navVerticalConfig(config)}
        />
      ))}
    </Stack>
  );
}

NavSectionVertical.propTypes = {
  config: PropTypes.object,
  data: PropTypes.array,
  sx: PropTypes.object,
};

export default memo(NavSectionVertical);

// ----------------------------------------------------------------------

function Group({ items, config }) {
  const renderContent = items.map((list) => (
    <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} config={config} />
  ));

  return (
    <List disablePadding sx={{ px: 2 }}>
      {renderContent}
    </List>
  );
}

Group.propTypes = {
  config: PropTypes.object,
  items: PropTypes.array,
};
