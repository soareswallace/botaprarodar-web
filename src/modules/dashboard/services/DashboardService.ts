/* eslint-disable no-console */
import BikeService from 'modules/bicycles/services/BikeService';
import CommunityService from 'modules/communities/services/CommunityService';
import User from 'modules/users/models/User';
import UserService from 'modules/users/services/UserService';
import ChartDataProps from 'shared/models/ChartDataProps';
import Bike from '../../bicycles/models/Bike';
import Community from '../../communities/models/Community';
import { BikesPerCommunities } from '../models/BikesPerCommunities';
import DashboardInfo from '../models/DashboardInfo';

const DashboardInfoInitialValues: DashboardInfo = {
  communitiesQuantity: 0,
  bikesQuantity: 0,
  bikesPerCommunities: [],
  withdrawalsPerCommunities: [],
  travelsDone: 0,
  incidentsHappened: 0,
  withdrawalsReason: [],
  bikersCommunities: [],
};

const DashboardService = {
  async dashboardInfo() {
    const communitiesData: Community[] =
      await CommunityService.getAllCommunities();

    const bikesData: Bike[] = await BikeService.getAllBikes();

    const usersData: User[] = await UserService.getAllUsers();

    return mapResultToData(communitiesData, bikesData, usersData);
  },
};

const mapResultToData = (
  communitiesData: Community[],
  bikesData: Bike[],
  usersData: User[],
): DashboardInfo => {
  const dashboardInfo: DashboardInfo = DashboardInfoInitialValues;

  dashboardInfo.communitiesQuantity = communitiesData.length;
  dashboardInfo.bikesQuantity = bikesData.length;
  dashboardInfo.bikesPerCommunities = communitiesData
    .map(community => {
      let quantity = 0;
      const bikes: Bike[] = [];

      bikesData.forEach(bike => {
        if (bike.communityId === community.id) {
          bikes.push(bike);
          quantity += 1;
        }
      });

      return {
        label: community.name,
        quantity,
        bikes,
      };
    })
    .filter(item => item.quantity > 0);

  dashboardInfo.withdrawalsPerCommunities = setWithdrawalsPerCommunities(
    dashboardInfo.bikesPerCommunities,
  );

  const withdrawalsReason: string[] = [];
  bikesData.forEach(bike => {
    if (bike.devolutions && bike.devolutions.length > 0) {
      dashboardInfo.travelsDone += bike.devolutions.length;
      bike.devolutions.forEach(devolution => {
        dashboardInfo.incidentsHappened +=
          devolution.quiz.problemsDuringRiding === 'Sim' ? 1 : 0;
        withdrawalsReason.push(devolution.quiz.reason);
      });
    }
  });

  dashboardInfo.withdrawalsReason = setWithdrawalsReason(withdrawalsReason);

  console.log(usersData);

  return dashboardInfo;
};

const setWithdrawalsReason = (
  withdrawalsReason: string[],
): ChartDataProps[] => {
  const unique: string[] = withdrawalsReason.filter(
    (value, index, array) => array.indexOf(value) === index,
  );
  const quantities: number[] = [];

  withdrawalsReason.forEach(item => {
    quantities[unique.indexOf(item)] = quantities[unique.indexOf(item)]
      ? quantities[unique.indexOf(item)] + 1
      : 1;
  });
  return unique
    .map((item, index) => {
      return {
        label: item,
        quantity: quantities[index],
      };
    })
    .sort((a, b) => b.quantity - a.quantity);
};

const setWithdrawalsPerCommunities = (
  bikesPerCommunities: BikesPerCommunities[],
): ChartDataProps[] => {
  let array: ChartDataProps[] = [];
  array = bikesPerCommunities.map(item => {
    let quantity = 0;

    item.bikes.forEach(bike => {
      if (bike.withdraws) {
        quantity += bike.withdraws.length;
      }
    });

    return {
      label: item.label,
      quantity,
    };
  });
  return array.filter(item => item.quantity > 0);
};

export default DashboardService;
