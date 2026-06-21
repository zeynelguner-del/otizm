import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    minAndroidVersion: "1.0.1",
    latestAndroidVersion: "1.0.1",
    minIosVersion: "1.0.2",
    latestIosVersion: "1.0.2",
    androidUrl: "https://play.google.com/store/apps/details?id=com.otizmdestekapp.otizmfarkindalik",
    iosUrl: "https://apps.apple.com/tr/app/otizeka/id6779704594"
  });
}
