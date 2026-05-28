export const BUSINESS_CONFIG = {
  id: "serenity-spa",
  name: "Serenity Spa & Wellness",
  industry: "Wellness & Spa",
  brandTone: "professional, calming, luxurious, and welcoming",

  contact: {
    phone: "+1 (555) 123-4567",
    email: "hello@serenityspa.com",
    address: "123 Harmony Lane, Suite 100, Wellness City, CA 90210",
    landmarks: "Located next to Harmony Park, 5 minutes from Downtown Station. Free parking available.",
  },

  hours: {
    mondayToFriday: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "Closed",
    lastBooking: "Last appointment slot is 1 hour before closing.",
  },

  services: [
    {
      id: "sv_massage_60",
      name: "Swedish Massage",
      duration: "60 mins",
      price: "$120",
      description: "A gentle full-body massage that improves circulation and promotes relaxation.",
    },
    {
      id: "sv_massage_90",
      name: "Deep Tissue Massage",
      duration: "90 mins",
      price: "$160",
      description: "Intense pressure targeting deeper layers of muscle tissue to relieve chronic tension.",
    },
    {
      id: "sv_facial",
      name: "Radiance Facial",
      duration: "45 mins",
      price: "$90",
      description: "Customized facial treatment designed to cleanse, exfoliate, and hydrate the skin.",
    },
    {
      id: "sv_hot_stone",
      name: "Hot Stone Therapy",
      duration: "75 mins",
      price: "$140",
      description: "Heated stones placed on key tension points to melt away stress and muscle stiffness.",
    },
    {
      id: "sv_aromatherapy",
      name: "Aromatherapy Session",
      duration: "50 mins",
      price: "$100",
      description: "Essential oil blends combined with light massage to uplift mood and reduce anxiety.",
    },
  ],

  packages: [
    {
      id: "pkg_basic",
      name: "Basic Relaxation",
      price: "$199",
      savings: "Save $11",
      includes: ["60-min Swedish Massage", "Radiance Facial"],
      bestFor: "First-time visitors or a quick recharge.",
      description: "Includes a 60-min Swedish Massage and a Radiance Facial.",
    },
    {
      id: "pkg_premium",
      name: "Premium Rejuvenation",
      price: "$299",
      savings: "Save $41",
      includes: ["90-min Deep Tissue Massage", "Radiance Facial", "Complimentary Aromatherapy add-on"],
      bestFor: "Those seeking deep relaxation and skin renewal.",
      description: "Includes a 90-min Deep Tissue Massage, Radiance Facial, and complimentary aromatherapy.",
    },
    {
      id: "pkg_ultimate",
      name: "Ultimate Luxury Experience",
      price: "$449",
      savings: "Save $61",
      includes: ["90-min Deep Tissue Massage", "Hot Stone Therapy", "Radiance Facial", "Aromatherapy Session", "Complimentary herbal tea & refreshments"],
      bestFor: "A full day of pampering — our most popular choice for special occasions.",
      description: "Our signature full-day package combining all our best treatments.",
    },
  ],

  availableSlots: {
    weekday: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"],
    saturday: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"],
    sunday: [],
    note: "Slots shown are general availability. Actual openings depend on the day. Popular evening slots (5-7 PM) and Saturday tend to fill up fast.",
  },

  bookingProcess: [
    "Tell us which service or package you are interested in.",
    "Choose your preferred date and time slot.",
    "Provide your name and phone number.",
    "Our team will confirm your booking via call/WhatsApp within 15 minutes.",
  ],

  policies: {
    cancellation: "We require 24 hours notice for any cancellations or rescheduling. Late cancellations will incur a 50% fee. No-shows are charged the full amount.",
    refund: "Refunds are processed within 5-7 business days for cancellations made on time.",
    offers: "Currently offering 15% off all weekday morning appointments (before 12 PM). Also, first-time visitors get a complimentary aromatherapy upgrade with any package.",
    loyalty: "Book 5 sessions and get the 6th one free (any service up to $140 value).",
  },
};
