export type VillageSummary = {
  village_name: string;
  total_surveys: number;
  total_members: number;
  with_aadhaar: number;
  without_aadhaar: number;
  without_ration: number;
};
export type Analytics = {
  villageSummary: VillageSummary[];
  problems: ProblemStatements[];
  surveyCountByDate: NestedCoutMap;
};
export type AvailableStatus = { available: number; not_available: number };
type CountMap = Record<string, number>;
export type NestedCoutMap = Record<string, CountMap>;

export type VillageAggregatedData = {
  household_info: {
    gender: {
      male: number;
      female: number;
      others: number;
    };
    gram_panchayat_name: CountMap;
    category: {
      SC: number;
      ST: number;
      OBC: number;
      General: number;
    };
    ration_card_type: CountMap;
    social_status: CountMap;
    apl_subcategory: CountMap;
    type_of_house: CountMap;
    annual_income: {
      less_than_50000: number;
      between_50000_and_100000: number;
      between_100000_and_150000: number;
      between_150000_and_200000: number;
      more_than_200000: number;
    };
  };

  migration_info: {
    migrated_from: CountMap;
    migration_frequency: CountMap;
    migrated_for_work: number;
    migration_years: number;
  };

  swachh_bharat: {
    mode_of_water_storage: CountMap;
    water_collection_type: CountMap;
    sanitation_system_type: CountMap;
    dimension_of_system: CountMap;
    material_used: CountMap;
    cleaning_period: CountMap;
    black_water_discharge_location: CountMap;
    grey_water_discharge_location: CountMap;
    water_source: {
      piped_water_at_home: AvailableStatus;
      community_water_tap: AvailableStatus;
      hand_pump: AvailableStatus;
      open_well: AvailableStatus;
      water_source_segregated: AvailableStatus;
    };
    drainage: {
      toilet_available: AvailableStatus;
      drainage_linked_to_house: AvailableStatus;
      compost_pit: AvailableStatus;
      biogas_plant: AvailableStatus;
      have_sanitation_system: AvailableStatus;
    };
  };

  electricity: {
    electricity: {
      electricity_connection: AvailableStatus;
      lighting: AvailableStatus;
    };
  };

  petroleum: {
    used_for_cooking: CountMap;
    lpg_subsidy: CountMap;
  };

  land_info: {
    total_area_acres: number;
    cultivable_area_acres: number;
    irrigated_area_acres: number;
    barren_waste_land_area_acres: number;
    unirrigated_area_acres: number;
    uncultivable_area_acres: number;
  };

  agricultural_inputs: {
    usage: {
      uses_chemical_fertilizer: AvailableStatus;
      uses_chemical_insecticides: AvailableStatus;
      uses_chemical_weedies: AvailableStatus;
      uses_organic_manure: AvailableStatus;
    };
    chemical_fertilizer_details: CountMap;
    chemical_insecticides_details: CountMap;
    chemical_weedies_details: CountMap;
    organic_manure_details: CountMap;
    irrigation_available: CountMap;
    irrigation_system: CountMap;
  };

  livestock: {
    animals: {
      cows: number;
      buffaloes: number;
      goats_sheep: number;
      calves: number;
      bullocks: number;
      poultry_ducks: number;
    };
    shelter_for_livestock: CountMap;
    avg_daily_milk_production: number;
    animal_waste_cow_dung_kg: number;
  };

  crop_info: Record<string, { crop_area: number; crop_productivity: number }>;

  family_info: {
    age_group: {
      less_than_20: number;
      between_20_and_40: number;
      between_40_and_60: number;
      more_than_60: number;
    };
    marital_status: CountMap;
    level_of_education: CountMap;
    employment_status: CountMap;
    cm_health_insurance_status: CountMap;
    skill_interested_to_acquire: CountMap;
    shg_member_status: CountMap;
    shg_activity: CountMap;
    nature_of_disability: CountMap;
    physically_challenged_status: CountMap;
    phy_challenged_id_card_status: CountMap;
  };
};

export type VillageWiseAnalyticalData = Record<string, VillageAggregatedData>;

export type SchemeData = {
  beneficiaries: number;
  avg_awareness_level: number;
};

export type VillageWiseSchemes = Record<string, SchemeData>;

export type StateSchemes = {
  thozhi: VillageWiseSchemes;
  vidiyal: VillageWiseSchemes;
  sirpiyin: VillageWiseSchemes;
  kaalai_unavu: VillageWiseSchemes;
  namma_school: VillageWiseSchemes;
  namakku_naame: VillageWiseSchemes;
  ennum_ezhuthum: VillageWiseSchemes;
  madi_siragugal: VillageWiseSchemes;
  naan_mudhalvan: VillageWiseSchemes;
  suya_unavukuzhu: VillageWiseSchemes;
  vaanavil_manram: VillageWiseSchemes;
  kalaignar_urimai: VillageWiseSchemes;
  illam_thedi_kalvi: VillageWiseSchemes;
  anaithu_grama_anna: VillageWiseSchemes;
  muthulakshmi_reddy: VillageWiseSchemes;
  inspector_kaappidu1: VillageWiseSchemes;
  vaazhnthu_kaattuvom: VillageWiseSchemes;
  makkalai_thedi_maruthuvam: VillageWiseSchemes;
  enadu_kuppai_enadu_poruppu: VillageWiseSchemes;
  kalaignar_orunginaindha_velai: VillageWiseSchemes;
  mahathma_gandhi_velai_urudhi_thittam: VillageWiseSchemes;
};

export type CentralSchemes = {
  financial_inclusion: VillageWiseSchemes;
  child_benefit: VillageWiseSchemes;
  mudra: VillageWiseSchemes;
  jeevan_jyoti: VillageWiseSchemes;
  suraksha_insurance: VillageWiseSchemes;
  old_age_pension: VillageWiseSchemes;
  skill_development: VillageWiseSchemes;
  janani_suraksha: VillageWiseSchemes;
  atal_mission: VillageWiseSchemes;
  meal_for_school: VillageWiseSchemes;
  health_checkup: VillageWiseSchemes;
  affordable_housing: VillageWiseSchemes;
  crop_insurance: VillageWiseSchemes;
  farmer_credit_card: VillageWiseSchemes;
  per_drop_more_crop: VillageWiseSchemes;
  soil_health_card: VillageWiseSchemes;
};

export type ChartConfig = {
  [k in string]: {
    label?: string;
    color?: string;
    fill?: string;
  };
};

// Define each individual block
type StudentInfo = {
  schedule_filed_by: string;
  college_id: string;
  password: string;
  mentor: string;
  mobile: string;
  year: string;
  section: string;
};

type RespondentProfile = {
  location: string;
  createdAt: Date;
  door_no: string;
  street_name: string;
  state: string;
  block_name: string;
  block_code: string;
  village_name: string;
  village_code: string;
  gram_panchayat_name: string;
  gram_panchayat_code: string;
  ward_no: string;
  aadhar_number: string;
  name: string;
  relationship_with_head: string;
  address: string;
  pincode: string;
  mobile: string;
};

type HouseholdInfo = {
  name: string;
  no_of_family_members: number;
  male: number;
  female: number;
  others: number;
  category: string;
  has_ration_card: boolean;
  ration_card_type: string;
  ration_card_number: string;
  social_status: string;
  apl_subcategory: string;
  living_in: string;
  rental_migration_from: string;
  type_of_house: string;
  annual_income: number;
};

type MigrationInfo = {
  migrated_for_work: boolean;
  num_migrated_members: number;
  migration_years: number;
  migration_frequency: string;
  migrated_from_another_area: boolean;
  migrated_from: string;
};

type SwachhBharat = {
  piped_water_at_home: boolean;
  community_water_tap: boolean;
  govt_or_private_supply: boolean;
  hand_pump: boolean;
  open_well: boolean;
  mode_of_water_storage: string;
  water_source_segregated: boolean;
  water_collection_type: string;
  toilet_available: boolean;
  drainage_linked_to_house: boolean;
  waste_collection_frequency: string;
  compost_pit: boolean;
  biogas_plant: boolean;
  have_sanitation_system: boolean;
  black_water_discharge_location: string;
  sanitation_system_type: string;
  dimension_of_system: string;
  material_used: string;
  cleaning_period: string;
  cost_of_system: number;
  grey_water_discharge_location: string;
};

type Electricity = {
  electricity_connection: boolean;
  hours_available: number;
  lighting: boolean;
  others: string;
};

type Petroleum = {
  used_for_cooking: string;
  other: string;
  lpg_subsidy: string;
};

type LandInfo = {
  total_area_acres: number;
  cultivable_area_acres: number;
  irrigated_area_acres: number;
  barren_waste_land_area_acres: number;
  unirrigated_area_acres: number;
  uncultivable_area_acres: number;
};

type AgriculturalInputs = {
  uses_chemical_fertilizer: boolean;
  chemical_fertilizer_details: string;
  uses_chemical_insecticides: boolean;
  chemical_insecticides_details: string;
  uses_chemical_weedies: boolean;
  chemical_weedies_details: string;
  uses_organic_manure: boolean;
  organic_manure_details: string;
  irrigation_available: string;
  irrigation_system: string;
};

type Livestock = {
  cows: number;
  buffaloes: number;
  goats_sheep: number;
  calves: number;
  bullocks: number;
  poultry_ducks: number;
  others_livestock: string;
  shelter_for_livestock: string;
  avg_daily_milk_production: string;
  animal_waste_cow_dung_kg: string;
};

type SchemeEntry = {
  awareness_level: number;
  beneficiaries: number;
};

type GovtSchemes = Record<string, number> & {
  [scheme: `${string}_awareness_level` | `${string}_beneficiaries`]: number;
};

type NationalSchemes = GovtSchemes;

export type ProblemStatements = {
  problem: string;
  suggestion: string;
};

type CropInfo = {
  crop_name: string;
  crop_area: number;
  productivity: number;
};

type FamilyInfo = {
  name: string;
  age: number;
  gender: string;
  marital_status: string;
  level_of_education: string;
  aadhaar_status: string;
  ration_card_status: string;
  bank_account_status: string;
  mobile_number_status: string;
  employment_status: string;
  physically_challenged_status: string;
  cm_health_insurance_status: string;
  skill_training_interest: string;
  skill_interested_to_acquire: string;
  shg_member_status: string;
  shg_name: string;
  shg_activity: string;
  nature_of_disability: string;
  phy_challenged_id_card_status: string;
};

// Main Household Entry
export type HouseholdData = {
  survey_id: string;
  respondent_profile: RespondentProfile;
  household_info?: HouseholdInfo;
  migration_info?: MigrationInfo;
  swachh_bharat?: SwachhBharat;
  electricity?: Electricity;
  petroleum?: Petroleum;
  land_info?: LandInfo;
  agricultural_inputs?: AgriculturalInputs;
  livestock?: Livestock;
  govt_schemes?: GovtSchemes;
  national_schemes?: NationalSchemes;
  problem_statements?: ProblemStatements[];
  crop_info?: CropInfo[];
  family_info?: FamilyInfo[];
};
export type FamilyMember = {
  age: number;
  name: string;
  gender: string;
  aadhaar_status: string;
  marital_status: string;
  level_of_education: string;
};

export type SurveyRecord = {
  id: string;

  survey_id: string;
  gram_panchayat_code: string;
  gram_panchayat_name: string;
  ward_no: string;
  survey_date: Date;
  village_code: string;
  village_name: string;
  no_of_family_members: number;
  family_info: FamilyMember[];
  schedule_filed_by: string;
  college_id: string;
  has_ration_card: boolean;
  no_of_members_without_aadhaar: number;
};

export type VillageGroupedData = Record<string, SurveyRecord[]>;

// Full Survey Data Structure
export type VillageSurveyData = Record<string, HouseholdData>;

export type AllVillagesData = Record<string, VillageSurveyData>;
