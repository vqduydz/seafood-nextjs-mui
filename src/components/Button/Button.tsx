import React, { CSSProperties, ReactNode } from 'react';
import '../Button/Button.css';
import Link from 'next/link';

export interface ButtonProps {
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  link?: boolean;
  link_n?: boolean;
  primary?: boolean;
  text?: boolean;
  text_e?: boolean;
  active?: boolean;
  scale?: boolean;
  disable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  //
  href?: string;
  target?: string;
  //
  className?: string;
  style?: CSSProperties;
}

const Button = ({
  onClick,
  outline = false,
  link = false,
  link_n = false,
  primary = false,
  text = false,
  text_e = false,
  scale = false,
  active = false,
  disable = false,
  leftIcon,
  rightIcon,
  className,
  children,
  style,
  href,
  target,
  ...passProps
}: ButtonProps) => {
  let Comp: React.ElementType = 'button';
  const props = { href, target, onClick, ...passProps };

  const propsWithIndexSignature: { [key: string]: any } = props;

  if (disable) {
    Object.keys(propsWithIndexSignature).forEach((key) => {
      if (key.startsWith('on') && typeof propsWithIndexSignature[key] === 'function') {
        delete propsWithIndexSignature[key];
      }
    });
  }

  // ...

  if (href) {
    props.href = href;
    if (target) props.target = target;
    Comp = Link as React.ElementType;
  }

  const classes = [
    'dbe-btn',
    outline && 'outline',
    primary && 'primary',
    text && 'text',
    text_e && 'text-e',
    link && 'link',
    link_n && 'link-n',
    scale && 'scale',
    disable && 'disable',
    active && 'active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Comp className={classes} {...props} style={style}>
      {leftIcon && <span className="icon">{leftIcon}</span>}
      <span className="title">{children}</span>
      {rightIcon && <span className="icon">{rightIcon}</span>}
    </Comp>
  );
};

export default Button;
