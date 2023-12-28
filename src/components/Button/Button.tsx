import React, { CSSProperties, ReactNode } from 'react';
import './Button.css';
import Link from 'next/link';

interface ButtonProps {
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  outline?: boolean;
  link?: boolean;
  primary?: boolean;
  text?: boolean;
  text_e?: boolean;
  active?: boolean;
  scale?: boolean;
  disable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  href?: string;
}

const Button = ({
  onClick,
  outline = false,
  link = false,
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
  ...passProps
}: ButtonProps) => {
  let Comp: React.ElementType = 'button';
  const props = { href, onClick, ...passProps };

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
    Comp = Link;
  }

  const classes = [
    'dbe-btn',
    outline && 'outline',
    primary && 'primary',
    text && 'text',
    text_e && 'text_e',
    link && 'link',
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
