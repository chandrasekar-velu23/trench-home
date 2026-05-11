import type { Schema, Struct } from '@strapi/strapi';

export interface ButtonsButtons extends Struct.ComponentSchema {
  collectionName: 'components_buttons_buttons';
  info: {
    displayName: 'Buttons';
  };
  attributes: {};
}

export interface ElementsInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_info_cards';
  info: {
    displayName: 'InfoCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsRibbon extends Struct.ComponentSchema {
  collectionName: 'components_elements_ribbons';
  info: {
    displayName: 'ribbon';
  };
  attributes: {
    hightlight_text: Schema.Attribute.String;
    ribbon_text: Schema.Attribute.String;
  };
}

export interface ElementsTeamInfo extends Struct.ComponentSchema {
  collectionName: 'components_elements_team_infos';
  info: {
    displayName: 'team_info';
  };
  attributes: {
    Name: Schema.Attribute.String;
    profile: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ElementsTeamInfo1 extends Struct.ComponentSchema {
  collectionName: 'components_elements_team_info_1s';
  info: {
    displayName: 'team_info_1';
  };
  attributes: {
    Name: Schema.Attribute.String;
    notes: Schema.Attribute.Text;
    profile: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    role: Schema.Attribute.String;
  };
}

export interface LinksLink extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface LinksNavbar extends Struct.ComponentSchema {
  collectionName: 'components_links_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    href: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
  };
}

export interface NavigationElementsFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_elements_footer_links';
  info: {
    displayName: 'elements.FooterLink';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface NavigationElementsFooterSection
  extends Struct.ComponentSchema {
  collectionName: 'components_navigation_elements_footer_sections';
  info: {
    displayName: 'elements.FooterSection';
  };
  attributes: {
    links: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface NavigationFooterBadges extends Struct.ComponentSchema {
  collectionName: 'components_navigation_footer_badges';
  info: {
    displayName: 'footer_badges';
  };
  attributes: {
    badges: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SectionsCardgird extends Struct.ComponentSchema {
  collectionName: 'components_sections_cardgirds';
  info: {
    displayName: 'cardgird';
  };
  attributes: {
    card_1: Schema.Attribute.Component<'elements.info-card', true>;
    card_2: Schema.Attribute.Component<'elements.info-card', true>;
  };
}

export interface SectionsComparisonsection extends Struct.ComponentSchema {
  collectionName: 'components_sections_comparisonsections';
  info: {
    displayName: 'comparisonsection';
  };
  attributes: {
    compare: Schema.Attribute.Component<'sections.featurename', true>;
    description: Schema.Attribute.Text;
    eyebrows_text: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    career_mail: Schema.Attribute.Email;
    eyebrows_text: Schema.Attribute.String;
    subtile: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_sections';
  info: {
    displayName: 'CTASection';
  };
  attributes: {
    cta_line: Schema.Attribute.String;
    eyebrows_text: Schema.Attribute.String;
    Link: Schema.Attribute.Component<'shared.link', true>;
    subtile: Schema.Attribute.String;
  };
}

export interface SectionsFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_sections';
  info: {
    displayName: 'FAQ Section';
  };
  attributes: {
    eyebrows_text: Schema.Attribute.String;
    faqs: Schema.Attribute.Component<'shared.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFeaturename extends Struct.ComponentSchema {
  collectionName: 'components_sections_featurenames';
  info: {
    displayName: 'featurename';
  };
  attributes: {
    boltedvalue: Schema.Attribute.Text;
    feature: Schema.Attribute.String;
    feature_id: Schema.Attribute.String;
    legacyvalue: Schema.Attribute.Text;
    trenchvalue: Schema.Attribute.Text;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    btn_link: Schema.Attribute.String;
    eyebrows_text: Schema.Attribute.String;
    Heading: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface SectionsProcessStepItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_process_step_items';
  info: {
    displayName: 'ProcessStepItem';
  };
  attributes: {
    badge: Schema.Attribute.JSON;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    stepNumber: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProcessSteps extends Struct.ComponentSchema {
  collectionName: 'components_sections_process_steps';
  info: {
    displayName: 'ProcessSteps';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    mainTitle: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'sections.process-step-item', true>;
  };
}

export interface SectionsSocialProof extends Struct.ComponentSchema {
  collectionName: 'components_sections_social_proofs';
  info: {
    displayName: 'SocialProof';
  };
  attributes: {
    Testimonial: Schema.Attribute.Component<'sections.testimonial', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {
    author: Schema.Attribute.String;
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Designations: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
  };
}

export interface SectionsWhyTrenchHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_trench_heroes';
  info: {
    displayName: 'why_trench_hero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrows_text: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary']>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'buttons.buttons': ButtonsButtons;
      'elements.info-card': ElementsInfoCard;
      'elements.ribbon': ElementsRibbon;
      'elements.team-info': ElementsTeamInfo;
      'elements.team-info-1': ElementsTeamInfo1;
      'links.link': LinksLink;
      'links.navbar': LinksNavbar;
      'navigation.elements-footer-link': NavigationElementsFooterLink;
      'navigation.elements-footer-section': NavigationElementsFooterSection;
      'navigation.footer-badges': NavigationFooterBadges;
      'sections.cardgird': SectionsCardgird;
      'sections.comparisonsection': SectionsComparisonsection;
      'sections.cta': SectionsCta;
      'sections.cta-section': SectionsCtaSection;
      'sections.faq-section': SectionsFaqSection;
      'sections.featurename': SectionsFeaturename;
      'sections.hero': SectionsHero;
      'sections.process-step-item': SectionsProcessStepItem;
      'sections.process-steps': SectionsProcessSteps;
      'sections.social-proof': SectionsSocialProof;
      'sections.testimonial': SectionsTestimonial;
      'sections.why-trench-hero': SectionsWhyTrenchHero;
      'shared.faq-item': SharedFaqItem;
      'shared.link': SharedLink;
    }
  }
}
