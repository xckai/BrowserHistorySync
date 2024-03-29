﻿namespace SyncManagerApi.Models.DB;

public class BrowserHistory
{
    public int Id { get; set; }
    public string Url { get; set; }
    public string Title { get; set; }
    public long Timestamp { get; set; }
    public string? FaviconUrl { get; set; }
    public string? Referrer { get; set; }
    public string? EquipmentName { get; set; }
    public string? BrowserType { get; set; }
}