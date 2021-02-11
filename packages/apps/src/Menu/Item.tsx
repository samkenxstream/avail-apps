// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ItemRoute } from './types';

import React from 'react';
import styled from 'styled-components';

import { Badge, Icon } from '@polkadot/react-components';
import { ThemeProps } from '@polkadot/react-components/types';
import { useToggle } from '@polkadot/react-hooks';

interface Props {
  className?: string;
  isLink?: boolean;
  isToplevel?: boolean;
  route: ItemRoute;
}

const DUMMY_COUNTER = () => 0;

function Item ({ className = '', isLink, isToplevel, route: { Modal, href, icon, name, text, useCounter = DUMMY_COUNTER } }: Props): React.ReactElement<Props> {
  const [isModalVisible, toggleModal] = useToggle();
  const count = useCounter();

  return (
    <li className={`ui--MenuItem ${className}${count ? ' withCounter' : ''} ${isLink ? 'isLink' : ''} ${isToplevel ? 'topLevel  highlight--color-contrast' : ''}`}>
      <a
        href={Modal ? undefined : (href || `#/${name}`)}
        onClick={Modal ? toggleModal : undefined}
        rel='noopener noreferrer'
        target={href ? '_blank' : undefined}
      >
        <Icon icon={icon} />
        {text}
        {!!count && (
          <Badge
            color={isToplevel ? 'counterInvert' : 'counter'}
            info={count}
          />
        )}
      </a>
      {Modal && isModalVisible && (
        <Modal onClose={toggleModal} />
      )}
    </li>
  );
}

export default React.memo(styled(Item)(({ theme } : ThemeProps) => `
  cursor: pointer;
  position: relative;
  white-space: nowrap;

  &.topLevel {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.214rem;
    border-radius: 0.15rem;
    margin-bottom: -5px;

    a {
      padding: 0.857rem 0.857em 0.786rem 1rem;
      margin-bottom: 1.071rem;
      line-height: 1.214rem;
      border-radius: 0.285rem;
    }

    &.isActive.highlight--color-contrast {
      font-size: 1.15rem;
      font-weight: 400;
      color: ${theme.color};

      a {
        background-color: ${theme.bgTabs};
      }
    }

    &.isActive {
      border-radius: 0.15rem 0.15rem 0 0;
      margin-bottom: -5px;

      a {
        padding: 0.857rem 1.429rem 1.857rem;
        margin-bottom: 0;
        cursor: default;
      }

      &&.withCounter a {
        padding-right: 3.2rem;
      }
    }
  }

  &&.withCounter a {
    padding-right: 3.2rem;
  }

  a {
    color: inherit !important;
    display: block;
    padding: 0.5rem 1.15rem 0.57rem;
    text-decoration: none;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .ui--Badge {
    position: absolute;
    right: 0.5rem;
    top: 0.7rem;
  }

  .ui--Icon {
    margin-right: 0.5rem;
  }
`));
