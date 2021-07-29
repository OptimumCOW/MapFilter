﻿using System.Collections.Generic;
using WhaleSpotting.Models.ApiModels;
using WhaleSpotting.Models.DbModels;
using RestSharp;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WhaleSpotting.Services
{
    public interface ISightingService
    {
        Task<List<SightingResponseModel>> GetSightings();
    }

    public class SightingsService : ISightingService
    {
        public WhaleSpottingContext _context;

        public SightingsService(WhaleSpottingContext context)
        {
            _context = context;
        }

        public async Task<List<SightingResponseModel>> GetSightings()
        {
            var client = new RestClient("http://hotline.whalemuseum.org/api.json");
            var sightings = await client.GetAsync<List<SightingResponseModel>>(new RestRequest());

            var sightingsRm = await _context.Sightings
                .OrderBy(s => s.SightedAt)
                .Select(s => new SightingResponseModel(s))
                .ToListAsync();
            sightings = sightings.Concat(sightingsRm)
                .OrderBy(s => s.SightedAt)
                .ToList();

            return sightings;
        }
    }
}