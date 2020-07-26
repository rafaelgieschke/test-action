#!/usr/bin/env node

import sodium from "tweetsodium";
import fetch from "node-fetch";
import { readFileSync } from "fs";
import octokitMod from "@octokit/core";
import { env } from "process";
const { Octokit } = octokitMod;

(async () => {
    console.log(process);
    const auth = env.INPUT_TOKEN || readFileSync("TOKEN", "ascii").trim();
    const octokit = new Octokit({ auth });

    const owner = "rafaelgieschke";
    const repo = "test5";
    const res = await octokit.request(
        "GET /repos/{owner}/{repo}/actions/secrets/public-key",
        {
            owner,
            repo,
        }
    );

    const res2 = await octokit.request(
        "GET /repos/{owner}/{repo}/actions/secrets",
        {
            owner,
            repo,
        }
    );

    const { key, key_id } = res.data;
    // const res3 = await octokit.request(
    //     "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}",
    //     {
    //         owner,
    //         repo,
    //         secret_name: "secret_name",
    //         encrypted_value: "AAAC",
    //         key_id,
    //     }
    // );

    console.log(res2.data.secrets);
    /*
    const value = "plain-text-secret";

    // Convert the message and key to Uint8Array's (Buffer implements that interface)
    const messageBytes = Buffer.from(value);
    const keyBytes = Buffer.from(key, "base64");

    // Encrypt using LibSodium.
    const encryptedBytes = sodium.seal(messageBytes, keyBytes);
    console.log(encryptedBytes);

    // Base64 the encrypted secret
    const encrypted = Buffer.from(encryptedBytes).toString("base64");

    console.log(encrypted);*/
})().catch(console.error);
