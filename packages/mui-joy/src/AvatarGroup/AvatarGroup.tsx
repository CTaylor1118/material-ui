import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getAvatarGroupUtilityClass } from './avatarGroupClasses';
import { AvatarGroupProps, AvatarGroupTypeMap } from './AvatarGroupProps';

export const AvatarGroupContext = React.createContext<undefined | AvatarGroupProps>(undefined);

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAvatarGroupUtilityClass, {});
};

const AvatarGroupGroupRoot = styled('div', {
  name: 'MuiAvatarGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: AvatarGroupProps }>(({ ownerState, theme }) => ({
  ...(ownerState.size === 'sm' && {
    '--AvatarGroup-gap': '-0.375rem',
    '--Avatar-ringSize': '2px',
  }),
  ...(ownerState.size === 'md' && {
    '--AvatarGroup-gap': '-0.5rem',
    '--Avatar-ringSize': '2px',
  }),
  ...(ownerState.size === 'lg' && {
    '--AvatarGroup-gap': '-0.625rem',
    '--Avatar-ringSize': '4px',
  }),
  '--Avatar-ring': `0 0 0 var(--Avatar-ringSize) var(--Avatar-ringColor, ${theme.vars.palette.background.body})`,
  '--Avatar-marginInlineStart': 'var(--AvatarGroup-gap)',
  display: 'flex',
  marginInlineStart: 'calc(-1 * var(--AvatarGroup-gap))',
}));

const AvatarGroup = React.forwardRef(function AvatarGroup(inProps, ref) {
  const props = useThemeProps<typeof inProps & AvatarGroupProps>({
    props: inProps,
    name: 'MuiAvatarGroup',
  });

  const {
    className,
    color = 'neutral',
    component = 'div',
    size = 'md',
    variant = 'light',
    children,
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    size,
    variant,
  };

  const classes = useUtilityClasses();

  return (
    <AvatarGroupContext.Provider value={ownerState}>
      <AvatarGroupGroupRoot
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        ref={ref}
        {...other}
      >
        {children}
      </AvatarGroupGroupRoot>
    </AvatarGroupContext.Provider>
  );
}) as OverridableComponent<AvatarGroupTypeMap>;

AvatarGroup.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the AvatarGroup if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The size of the component.
   * It accepts theme values between 'xs' and 'xl'.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
  /**
   * The variant to use.
   * @default 'light'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default AvatarGroup;
