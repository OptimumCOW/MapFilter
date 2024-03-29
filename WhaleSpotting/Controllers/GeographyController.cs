﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WhaleSpotting.Services;
using WhaleSpotting.Models.ResponseModels;
using WhaleSpotting.Models.RequestModels;

namespace WhaleSpotting.Controllers
{
    [Route("/geography")]
    public class GeographyController : ControllerBase
    {
        private readonly IGeographyService _geography;
        public GeographyController(IGeographyService geography)
        {
            _geography = geography;
        }

        [HttpPost]
        public IActionResult PopulateSampleData()
        {
            _geography.populateSampleData();
            return Ok();
        }

        [HttpPost("poprandom/{total}")]
        public IActionResult PopulateRandomSampleData([FromRoute] int total)
        {
            _geography.populateRandomSampleData(total);
            return Ok();
        }

        [HttpGet("batch")]
        public BatchGeographyResponseModel GetBatchGeography([FromQuery] BatchGeographyRequestModel batchGeography)
        {
            return _geography.GetBatchGeography(batchGeography);
        }
    }
}
