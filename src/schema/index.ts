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
}

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
  survey_id: string;
  gram_panchayat_code: string;
  gram_panchayat_name: string;
  ward_no: string;
  survey_date: Date;
  village_code: string;
  no_of_family_members: number;
  family_info: FamilyMember[];
  piped_water_at_home: boolean;
  govt_or_private_supply: boolean;
  electricity_connection: boolean;
  has_ration_card: boolean;
  no_of_members_without_aadhaar: number;
};

export type VillageGroupedData = Record<string, SurveyRecord[]>;

// Full Survey Data Structure
export type VillageSurveyData = Record<string, HouseholdData>;

export type AllVillagesData = Record<string, VillageSurveyData>;
