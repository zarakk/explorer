'use client';

import {
  PAGE_MAX_WIDTH,
  SITE_NOTICE_BANNER_LABEL,
  SITE_NOTICE_BANNER_MESSAGE,
  SITE_NOTICE_ENABLED,
} from '@/common/constants';
import { Footer } from '@/components/footer';
import { Modals } from '@/components/modals';
import { NetworkModeToast } from '@/components/network-mode-toast';
import { Notice } from '@/components/notice';
import { SearchComponent } from '@/features/search/search';
import { StatusBar } from '@/features/status-bar';
import { Box } from '@/ui/Box';
import { Flex } from '@/ui/Flex';
import { useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import { NavBar } from '@/app/components/NavBar';

export const PageWrapper: FC = ({ children }) => {
  const colorMode = useColorMode().colorMode;

  return (
    <>
      <Box position={'sticky'} width={'100%'} top={'0'} backdropFilter={'blur(10px)'} zIndex={2}>
        <StatusBar />
      </Box>
      <Flex
        maxWidth="100vw"
        overflowX="hidden"
        flexDirection="column"
        minHeight="100vh"
        position="relative"
        overflow="hidden"
        style={{
          backgroundAttachment: 'fixed',
          backgroundImage:
            colorMode === 'light'
              ? 'linear-gradient(transparent, transparent 530px, white 530px), linear-gradient(30deg, rgb(98, 135, 221), rgb(231, 72, 92) 58%, rgb(102, 137, 221) 100%)'
              : undefined,
        }}
      >
        <Box marginLeft={`calc(100vw - 100%)`}>
          <NavBar />
          <Flex
            display={['block', 'block', 'none', 'none']}
            p="8px"
            mx="auto"
            width="100%"
            flexDirection={'column'}
            px={'16px'}
          >
            <SearchComponent variant="small" mr="16px" width="100%" maxWidth="760px" />
          </Flex>
          <Flex
            flexDirection="column"
            width="100%"
            minHeight="100%"
            position="relative"
            flexGrow={1}
          >
            {SITE_NOTICE_ENABLED && (
              <Box px="20px">
                <Notice label={SITE_NOTICE_BANNER_LABEL} message={SITE_NOTICE_BANNER_MESSAGE} />
              </Box>
            )}
            <Flex
              as="main"
              mx="auto"
              width="100%"
              flexGrow={1}
              height="100%"
              maxWidth={PAGE_MAX_WIDTH}
              flexDirection="column"
              px={['16px', '16px', '32px']}
            >
              {children}
            </Flex>
            <Footer />
          </Flex>
        </Box>
      </Flex>
      <Modals />
      <NetworkModeToast />
    </>
  );
};
