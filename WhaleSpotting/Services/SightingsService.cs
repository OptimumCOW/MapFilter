﻿using System.Collections.Generic;
using WhaleSpotting.Models.DbModels;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WhaleSpotting.Models.RequestModels;
using WhaleSpotting.Models.Enums;
using System;
using WhaleSpotting.Models.ResponseModels;

namespace WhaleSpotting.Services
{
    public interface ISightingsService
    {
        Task<List<SightingResponseModel>> GetSightings();
        List<SightingResponseModel> SearchSighting(SearchSightingRequestModel searchSightingRequestModel);
        SightingResponseModel CreateSighting(SightingRequestModel sightingRequestModel);
        Task<SightingResponseModel> ConfirmSighting(int id);
        Task<List<SightingResponseModel>> GetNotConfirmedSightings();
    }

    public class SightingsService : ISightingsService
    {
        private readonly WhaleSpottingContext _context;

        public SightingsService(WhaleSpottingContext context)
        {
            _context = context;
        }

        public async Task<List<SightingResponseModel>> GetSightings()
        {
            var sightings = await _context.Sightings
                .OrderBy(s => s.SightedAt)
                .Select(s => new SightingResponseModel(s))
                .ToListAsync();

            return sightings;
        }

        public List<SightingResponseModel> SearchSighting(SearchSightingRequestModel searchSighting)
        {
            var sightings = _context.Sightings
                .Where(s => s.Species  == searchSighting.Species)
                .OrderBy(s => s.SightedAt)
                .Select(s => new SightingResponseModel(s))
                .ToList();

            return sightings;
        }

        public SightingResponseModel CreateSighting(SightingRequestModel sightingRequestModel)
        {
            if (sightingRequestModel.SightedAt > DateTime.Now)
            {
                throw new Exception("Sighted At must be in the past");
            }

            var newSighting = new SightingDbModel
            {
                Species = sightingRequestModel.Species,
                Quantity = sightingRequestModel.Quantity,
                Description = sightingRequestModel.Description,
                Longitude = sightingRequestModel.Longitude,
                Latitude = sightingRequestModel.Latitude,
                Location = sightingRequestModel.Location,
                SightedAt = sightingRequestModel.SightedAt,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                OrcaType = sightingRequestModel.OrcaType,
                OrcaPod = sightingRequestModel.OrcaPod,
                Confirmed = false,
                // TO DO - add User
            };

            _context.Sightings.Add(newSighting);
            _context.SaveChanges();

            return new SightingResponseModel(newSighting);
        }

        public async Task<SightingResponseModel> ConfirmSighting(int id)
        {
            var sighting = await _context.Sightings
                .SingleOrDefaultAsync(s => s.Id == id);

            if (sighting == null)
            {
                return null;
            }
            
            sighting.Confirmed = true;
            _context.SaveChanges();

            return new SightingResponseModel(sighting);
        }

        public async Task<List<SightingResponseModel>> GetNotConfirmedSightings()
        {
            var sightings = await _context.Sightings
                .Where(s => s.Confirmed == false)
                .OrderBy(s => s.SightedAt)
                .Select(s => new SightingResponseModel(s))
                .ToListAsync();

            return sightings;
        }
    }
}