import {
  CheckCircle2,
  CheckSquare,
  DollarSign,
  Filter,
  Gift,
  Lightbulb,
  Medal,
  MessageSquare,
  PartyPopper,
  ThumbsUp,
  Zap,
} from 'lucide-react';

export const featureTabs = [
  {
    id: 'idea',
    title: '아이디어 제안',
    icon: Lightbulb,
    subtitle: '시청자의 창의력 발휘',
    description:
      '게임, 이벤트, 코스프레 등 다양한 분야의 방송 아이디어를 자유롭게 제안하세요. 시청자가 곧 콘텐츠의 기획자가 됩니다.',
    highlights: [
      {
        title: '간편 등록',
        description:
          '간단한 양식으로 아이디어를 제출하고, 필요한 장비나 예산도 함께 제안할 수 있습니다.',
        icon: Zap,
      },
      {
        title: '커뮤니티 토론',
        description:
          '다른 시청자들과 댓글이나 투표로 소통하며, 아이디어를 더 발전시킬 수 있습니다.',
        icon: MessageSquare,
      },
      {
        title: '맞춤 분류',
        description:
          '게임, 코스프레, 이벤트 등 카테고리를 설정해, 스트리머가 원하는 아이디어만 쉽게 탐색하도록 지원합니다.',
        icon: Filter,
      },
    ],
  },
  {
    id: 'vote',
    title: '투표 & 채택',
    icon: CheckSquare,
    subtitle: '스트리머가 직접 선택',
    description:
      '커뮤니티 투표와 스트리머 맞춤 가이드라인을 통해, 가장 재미있고 실현 가능한 아이디어를 쉽게 찾고 채택할 수 있습니다.',
    highlights: [
      {
        title: '커뮤니티 투표',
        description: '좋아요, 별점 등을 통해 인기 아이디어를 선별하고, 시청자 의견을 반영합니다.',
        icon: ThumbsUp,
      },
      {
        title: '맞춤 가이드라인',
        description:
          '각 스트리머별로 ‘야외촬영 불가’, ‘19금 불가’ 등 세부 기준을 설정할 수 있습니다.',
        icon: Lightbulb,
      },
      {
        title: '채택 알림',
        description:
          '채택이 확정되면 제안자에게 실시간 알림이 전송되며, 수정 요청도 주고받을 수 있습니다.',
        icon: CheckCircle2,
      },
    ],
  },
  {
    id: 'reward',
    title: '보상 & 참여',
    icon: Gift,
    subtitle: '시청자에게 돌아가는 혜택',
    description:
      '채택된 아이디어가 실제 방송에 적용되면, 제안자에게 다양한 보상을 지급해주고 특별 게스트나 VIP 혜택까지 제공합니다.',
    highlights: [
      {
        title: '포인트·현금 보상',
        description:
          '채택 시 스트리머가 설정한 포인트 또는 현금을 지급받고, 누적 시 출금 또는 굿즈 교환 가능합니다.',
        icon: DollarSign,
      },
      {
        title: '명예 시스템',
        description: '채택 횟수에 따라 레벨과 배지를 부여해, 활발한 참여자를 인정해 줍니다.',
        icon: Medal,
      },
      {
        title: '방송 참여',
        description:
          '게스트로 방송에 등장하거나 특정 코너를 진행하는 등, 단순 ‘아이디어 제안’ 이상의 재미를 제공합니다.',
        icon: PartyPopper,
      },
    ],
  },
];
